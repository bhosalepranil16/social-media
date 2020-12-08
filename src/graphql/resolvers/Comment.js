const Comment = {
    author: async(parent, args, ctx, info) => {
        const user = await ctx.default.User.findById(parent.author);
        return user;
    },
    post: async(parent, args, ctx, info) => {
        const post = await ctx.default.Post.findById(parent.post);
        return post;
    }
};

export default Comment;