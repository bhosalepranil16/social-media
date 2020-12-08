import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title : {
        type : mongoose.Schema.Types.String,
        required: true
    },
    body : {
        type : mongoose.Schema.Types.String,
        required: true
    },
    author: {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export default new mongoose.model('Post', postSchema);