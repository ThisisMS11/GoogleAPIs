import { NextResponse } from "next/server";
import { connectToDB } from '../../../../utils/database'
import Notes from '../../../../models/Notes'
import User from '../../../../models/User'; // Update the import path to 'User'


/* for creating new note */
export const POST = async (req) => {
    const Myself = req.headers.get('userId');

    await connectToDB();

    /* finding the presence of user in the database */
    const user = await User.findById(Myself);

    if (!user) {
        return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
    }

    const { title, content, videoId } = await req.json();

    /* create a new note here */
    const newNote = await Notes.create({
        userId: Myself,
        videoId,
        title,
        content
    });

    return NextResponse.json({ newNote }, { status: 201 });
}


