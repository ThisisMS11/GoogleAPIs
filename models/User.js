import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    googleId:{
        type: String,
        required: [true, 'GoogleId is required!'],
        unique: [true, 'GoogleId already exists!'],
    },
    name: {
        type: String,
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/cloudinarymohit/image/upload/v1685034293/Screenshot_from_2023-05-25_22-34-21_nb2suf.png'
    }
});

/* models contains all the models that have been registered with Mongoose. and we do not want to recreate them when every new api route is called. and if the User model already exists in the models then we don't want to recreate it but using the existing one. */

const User = models.User || model("User", UserSchema);

export default User;