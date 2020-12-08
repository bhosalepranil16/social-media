const User = {
    posts: async(parent, args, ctx, info) => {
        const Post = ctx.default.Post;
        const posts = await Post.find({author: parent._id});
        return posts;
    },
    comments: async(parent, args, ctx, info) => {
        const Comment = ctx.default.Comment;
        const comments = await Comment.find({author: parent._id});
        return comments;
    }
}

export default User;