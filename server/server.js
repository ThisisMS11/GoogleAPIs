const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const { google } = require('googleapis');
const fetch = require('node-fetch');


require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
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
    // get code from url
    const code = req.query.code;
    console.log("server 36 | code", code);
    // get access token
    oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
            console.log("server 39 | error", err);
            throw new Error("Issue with Login", err.message);
        }
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;

        res.redirect(
            `${process.env.CLIENT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
        );
    });
});


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
        console.log("server 74 | data", data.access_token);

        res.json({
            accessToken: data.access_token,
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

