import mongoose from 'mongoose';

import User from './models/user';
import Post from './models/post';
import Comment from './models/comment';

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(() => {
    console.log('connected to database');
})
.catch((err) => {
    console.log(err);
});

export default {
    User,
    Post,
    Comment
};