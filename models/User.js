import mongoose, { model, Schema} from "mongoose";


export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const UserModel = model('users', UserSchema);
export default UserModel;
