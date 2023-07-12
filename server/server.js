const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const { google } = require('googleapis');
const fetch = require('node-fetch');
const multer = require('multer');
const { Readable } = require('stream');
const storage = multer.memoryStorage();
const mediaUpload = multer({ storage: storage }).array('file')
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

let isAuthenticated = false;


const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/userinfo.profile'
];


app.get("/api/createAuthLink", cors(), (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        prompt: "consent",
    });

    console.log(url);
    res.json({ url });
});


app.get("/api/handleGoogleRedirect", async (req, res) => {
    // get code from callback url needed to exchange with refresh and accesstokens.
    const code = req.query.code;

    oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
            console.log('tokens err : ', err);
            res.json({ error: "tokens not found" }).status(404);
        }

        oauth2Client.setCredentials(tokens);

        isAuthenticated = true;

        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;

        /* redirect to the frontend page with the accesstoken and refreshtoken to the frontend in case i have any usecase their of it */

        res.redirect(`${process.env.CLIENT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)
    });
});


/* in case our accesstoken expires we want to regenrate new ones using the refresh tokens */
app.post("/api/getValidToken", async (req, res) => {
    try {
        const request = await fetch("https://www.googleapis.com/oauth2/v4/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                refresh_token: req.body.refreshToken,
                grant_type: "refresh_token",
            }),
        });

        const data = await request.json();

        res.json({
            accessToken: data.access_token,
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.post('/api/upload/video', (req, res) => {
    mediaUpload(req, res, function (err) {
        if (err) {
            console.log("Media upload error : ", err);
            throw err;
        }

        const { title, description } = req.body;

        console.log({ title, description });
        console.log(req.files);

        const videofile = req.files[0];

        const mediaBuffer = videofile.buffer;

        /* creating readable file stream from buffer that the youtube request body accepts */
        const stream = Readable.from(mediaBuffer);

        /* now call the youtube api here */

        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client
        })

        /* youtube upload endpoint is called in this function only */
        youtube.videos.insert({
            part: 'snippet,status',
            resource: {
                snippet: {
                    title,
                    description,
                    tags: ['tag1', 'tag2']
                },
                status: {
                    privacyStatus: 'private'
                }
            },

            media: {
                body: stream
            }
        }, (err, data) => {
            if (err) throw err;

            console.log(data);

            res.json({ message: "things went successfully correct Mohit ! " });
        })
    })
})


/* api endpoint to get the information of the requested user */
app.get('/api/userinfo', (req, res) => {
    if (isAuthenticated) {

        let oauth2 = google.oauth2({
            version: 'v2',
            auth: oauth2Client
        });

        oauth2.userinfo.get((err, data) => {
            if (err) {
                console.log('here is the error ', { err });
            }
            else {
                const name = data.data.name;
                const email = data.data.email;
                const picture = data.data.picture

                const response = { name, email, picture }
                console.log(response);

                res.json(response).status(200);
            }
        })
    } else {
        res.json({ error: "User not authenticated" }).status(401);
    }
})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

