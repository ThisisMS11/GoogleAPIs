import { oauth2Client } from "../createAuthLink/route";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { connectToDB } from "../../../../utils/database";
import User from '../../../../models/User'
import { google } from 'googleapis'
import jwt from 'jsonwebtoken'

const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
};

export const GET = async (req) => {
    const codeEncoded = req.url.split('code=')[1];
    const code = decodeURIComponent(codeEncoded);

    // console.log({ code });

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

        await connectToDB();

        let user = await User.find({ googleId: data.id });

        /* if user do not exist only then create the new user otherwise let it be */
        if (user.length === 0) {
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
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);


        /* setting the request cookies here */
        cookies().set('accessToken', accessToken, { secure: true })
        cookies().set('refreshToken', refreshToken, { secure: true });
        cookies().set('expirationTime', newExpirationDate, { secure: true });
        cookies().set('isLoggedIn', true, { secure: true });

        const url = `${process.env.NEXT_PUBLIC_SERVER}?token=${token}`;

        return NextResponse.redirect(url);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ handleRedirectError: err });
    }
};
