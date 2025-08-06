import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({

    clerkId : {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}); 


const User = models?.User || model('User', userSchema);

export default User;