import { NextResponse } from "next/server";
import { oauth2Client } from "../createAuthLink/route";
import {google} from 'googleapis'

export const POST = async (req) => {

    const { accessToken, refreshToken } = await req.json();

    if (!accessToken ) {
        return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }

    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });


    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });

    try {
        const { data } = await oauth2.userinfo.get();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error : error.message}, { status: 400 });
    }
}