import { NextResponse } from 'next/server'
import User from '../../../../models/User';

export const GET = async (req) => {
    /* how should i authorise the user? */

    const userIdinSubscribe = req.headers.get('userId');

    return NextResponse.json({ userIdinSubscribe });
}