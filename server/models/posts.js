import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
});

const User = mongoose.model('Posts', postsSchema);

export default User;