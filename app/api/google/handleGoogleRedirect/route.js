import { oauth2Client } from "../createAuthLink/route";
import { NextResponse } from "next/server";

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

        const url = `${process.env.NEXT_PUBLIC_SERVER}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
        console.log(url);

        return NextResponse.redirect(url);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ handleRedirectError: err, code });
    }
};
