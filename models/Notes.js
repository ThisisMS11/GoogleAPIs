import { Schema, model, models } from 'mongoose';

const NotesSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'User id is required']
    },
    videoId: {
        type: String,
        required: [true, 'videoId is required!'],
    },
    title: {
        type: String,
        required: [true, 'title is required!']
    },
    content: {
        type: String,
        maxlength: [500, 'Note can not have more than 50 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* models contains all the models that have been registered with Mongoose. and we do not want to recreate them when every new api route is called. and if the Notes model already exists in the models then we don't want to recreate it but using the existing one. */

const Notes = models.Notes || model("Notes", NotesSchema);

export default Notes;