import { NextResponse } from "next/server";
import { connectToDB } from '../../../../../../utils/database'
import User from "../../../../../../models/User";

/* updating the note */
export const PUT = async (req, { params }) => {
    const Myself = req.headers.get('userId');
    await connectToDB();

    /* find the note here */
    try {

        /* finding the presence of user in the database */
        const user = await User.findById(Myself);
        if (!user) {
            return NextResponse.json({ error: "User not found in the database" }, { status: 404 });
        }

        const videoId = params.id;

        // checking whether the array of likes already contains the user id or not

        const alreadyViewed = user.videosViewed.some((id) => id === videoId);

        if (alreadyViewed) {
            user.videosViewed.remove(videoId);
            await user.save();
        }

        return NextResponse.json({ user }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 404 })
    }
}

