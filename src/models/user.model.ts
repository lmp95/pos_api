import mongoose from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import defaultFields from './default.model';
const UserSchema = new mongoose.Schema<UserInterface>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
