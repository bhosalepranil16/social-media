const Post = {
    comments: async(parent, args, ctx, info) => {
        const Comment = ctx.default.Comment;
        const comments = await Comment.find({post: parent._id});
        return comments;
    },
    author: async(parent, args, ctx, info) => {
        const User = ctx.default.User;
        const author = await User.findById(parent.author);
        return author;
    }
}

export default Post;