import { google } from 'googleapis';
import { oauth2Client } from '../../createAuthLink/route';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    /* get the access token in the request body */

    let accessToken = req.cookies.get("accessToken")?.value;
    let refreshToken = req.cookies.get("refreshToken")?.value;


    let { query, regionCode } = await req.json();

    const tokens = {
        access_token: accessToken,
        refresh_token: refreshToken
    }

    /* set the credentials */
    oauth2Client.setCredentials(tokens);

    /* call the youtube api */
    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    })

    /* get the videos */

    try {
        const { data } = await youtube.search.list({
            /* this is to decide which properties we want */
            part: 'snippet',
            q: query,
            regionCode: regionCode,
            type: 'video',
            maxResults: 3
        })

        return NextResponse.json({ data: data.items })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 401 })
    }
}
