import { NextResponse } from "next/server"
import { google } from 'googleapis'
import { oauth2Client } from "../../../google/createAuthLink/route";

export const GET = async (req, { params }) => {
    /* get the access token in the request body */


    const playlistId = params.id;

    console.log(req.cookies.get('accessToken'));

    let accessToken = req.cookies.get("accessToken")?.value;

    let refreshToken = req.cookies.get("refreshToken")?.value;


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
        const { data } = await youtube.playlistItems.list({
            /* this is to decide which properties we want */
            part: 'snippet,contentDetails',
            maxResults: 50,
            playlistId
        })

        return NextResponse.json({ data: data.items })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 401 })
    }
}
