import { oauth2Client } from "../createAuthLink/route";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
};

export const GET = async (req) => {
    const codeEncoded = req.url.split('code=')[1];
    const code = decodeURIComponent(codeEncoded);

    console.log({ code });

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


        /* setting the request cookies here */
        cookies().set('accessToken', accessToken, { secure: true })
        cookies().set('refreshToken', refreshToken, { secure: true });
        cookies().set('expirationTime', newExpirationDate, { secure: true });
        cookies().set('isLoggedIn', true, { secure: true });

        const url = `${process.env.NEXT_PUBLIC_SERVER}`;
        console.log(url);

        return NextResponse.redirect(url);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ handleRedirectError: err, code });
    }
};
