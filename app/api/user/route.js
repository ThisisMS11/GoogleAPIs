import User from '../../../models/User';
import { NextResponse } from 'next/server';
import { connectToDB } from '../../../utils/database';

export const GET = async (req) => {
    const Myself = req.headers.get('userId');

    await connectToDB();

    try {
        const user = await User.findById(Myself);

        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 203 })
    }
}