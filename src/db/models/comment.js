import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text : {
        type : mongoose.Schema.Types.String,
         required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
});

export default mongoose.model('Comment', commentSchema);