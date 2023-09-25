import { oauth2Client } from "../createAuthLink/route";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { connectToDB } from "../../../../utils/database";
import User from '../../../../models/User'
import { google } from 'googleapis'
import * as jose from 'jose'


const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
};

export const GET = async (req) => {
    const codeEncoded = req.url.split('code=')[1];
    const code = decodeURIComponent(codeEncoded);


    try {
        const tokens = await new Promise((resolve, reject) => {
            oauth2Client.getToken(code, (err, tokens) => {
                if (err) {
                    console.log('tokens err:', err);
                    reject(err);
                }
                oauth2Client.setCredentials(tokens);
                resolve(tokens);
            });
        });

        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;


        /* get user information here */
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2",
        });



        /* Getting user information */

        const { data } = await oauth2.userinfo.get();

        // console.log({ data });

        await connectToDB();

        let user = await User.findOne({ googleId: data.id });

        console.log('user before new one ', { user });

        /* if user do not exist only then create the new user otherwise let it be */
        if (!user) {
            /* create the user in the database */
            user = new User({
                googleId: data.id,
                name: data.name,
                email: data.email,
                picture: data.picture
            });

            // console.log({newUser});
            await user.save();
        }

        console.log('user after new one ', { user });

        /* generate the token here */

        const userId = user._id; // Replace this with your actual user ID

        console.log({ userId: user._id });

        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        const alg = 'HS256';

        const server = process.env.NEXT_PUBLIC_SERVER;

        const jwt = await new jose.SignJWT({ server: true })
            .setProtectedHeader({ alg })
            .setSubject(userId) // Set the "sub" claim to the user ID
            .setIssuedAt()
            .setIssuer(server)
            .setAudience(server) // Set the "aud" claim to the user ID
            .setExpirationTime('2h')
            .sign(secret);




        /* setting the request cookies here */
        cookies().set('accessToken', accessToken, { secure: true })
        cookies().set('refreshToken', refreshToken, { secure: true });
        cookies().set('expirationTime', newExpirationDate, { secure: true });
        cookies().set('isLoggedIn', true, { secure: true });
        cookies().set('token',jwt,{secure:true});

        const url = `${server}?token=${jwt}`;

        return NextResponse.redirect(url);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ handleRedirectError: err });
    }
};
