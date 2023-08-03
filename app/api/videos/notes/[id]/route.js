import { NextResponse } from "next/server";
import { connectToDB } from '../../../../../utils/database'
import Notes from '../../../../../models/Notes'
import User from '../../../../../models/User';
import mongoose from "mongoose";


/* Fetching all the notes */
export const GET = async (req, { params }) => {

    const Myself = req.headers.get('userId');
    await connectToDB();

    /* finding the presence of user in the database */
    const user = await User.findById(Myself);

    if (!user) {
        return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
    }

    const videoId = params.id;
    await connectToDB();

    try {
        const notes = await Notes.find({ videoId, userId: Myself });
        return NextResponse.json({ notes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 405 });
    }
}


/* updating the note */
export const PUT = async (req, { params }) => {
    const Myself = req.headers.get('userId');
    await connectToDB();

    /* finding the presence of user in the database */
    const user = await User.findById(Myself);

    if (!user) {
        return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
    }

    const noteId = params.id;

    /* find the note here */

    try {

        const noteToUpdate = await Notes.findById(noteId);

        if (!noteToUpdate) {
            return NextResponse.json({ error: "Note not found here" }, { status: 401 })
        }

        if (noteToUpdate.userId !== Myself) {
            return NextResponse.json({ error: "User not authorised to change the note" }, { status: 403 })
        }

        const { title, content } = await req.json();

        const updateNoteRes = await Notes.findByIdAndUpdate(noteId, { title, content }, {
            returnDocument: 'after',
            select: 'title content'
        });

        return NextResponse.json({ updatedNoteResponse: updateNoteRes }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}

/* for deleting a note */
export const DELETE = async (req, { params }) => {
    const Myself = req.headers.get('userId');

    await connectToDB();

    /* finding the presence of user in the database */
    const user = await User.findById(Myself);

    if (!user) {
        return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
    }

    const noteId = params.id;

    try {
        const noteToDelete = await Notes.findById(noteId);

        if (!noteToDelete) {
            return NextResponse.json({ error: "Note not found here" }, { status: 401 })
        }

        if (noteToDelete.userId !== Myself) {
            return NextResponse.json({ error: "User not authorised to delete the note" }, { status: 403 })
        }

        const deleteNoteRes = await Notes.findByIdAndDelete({ _id: noteId });
        return NextResponse.json({ deleteNoteRes })

    } catch (error) {
        return NextResponse.json({ error })
    }
}


