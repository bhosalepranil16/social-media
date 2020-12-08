import bcrypt from 'bcryptjs';

const Mutation = {
    createUser: async(parent, args, ctx, info) => {
        try {
            const User = ctx.default.User;
            const hashedPassword = await bcrypt.hash(args.data.password, 8);
            const user = new User({
                ...args.data,
                password: hashedPassword
            })
            await user.save();
            return user;
        }
        catch(err) {
            console.log(err);
        }
    },
    updateUser: async (parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const User = ctx.default.User;
            const user = await User.findById(args.id);
            if(!user) {
                throw new Error('user not found');
            }
            const keysArray = Object.keys(args.data);
            keysArray.forEach(async(a) => {
                if(args.data[a]) {
                    if(a === 'password') {
                        user[a] = await bcrypt.hash(args.data[a], 8);
                    }
                    else {
                        user[a] = args.data[a];
                    }
                }
            });
            await user.save();
            return user;
        } 
        catch (error) {
            console.log(err);
        }        
    },
    deleteUser: async (parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Post = ctx.default.Post;
            const User = ctx.default.User;
            const Comment = ctx.default.Comment;
            const user = await User.findById(args.id);
            if(!user) {
                throw new Error('user not found');
            }
            const posts = await Post.find({author: args.id});
            posts.forEach(async(post) => {
                await deleteComments(post._id, Comment);
            });
            await Post.deleteMany({author: args.id});
            await Comment.deleteMany({author: args.id});
            const deleted = await User.deleteOne({_id: args.id});
            return deleted.ok;
        } 
        catch (error) {
            console.log(error);    
        }
    },
    createPost: async(parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Post = ctx.default.Post;
            const post = new Post({
                ...args.data
            });
            await post.save();
            return post;
        } 
        catch (error) {
            console.log(error);    
        }
    },
    deletePost: async(parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Post = ctx.default.Post;
            const post = await Post.findById(args.id);
            if(!post) {
                throw new Error('post not found');
            }
            await deleteComments(post._id, ctx.default.Comment);
            const deleted = await Post.deleteOne({_id: args.id});
            return deleted.ok;
        } 
        catch (error) {
            console.log(error);    
        }
    },
    createComment: async(parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Comment = ctx.default.Comment;
            const comment = new Comment({
                ...args.data,
            });
            await comment.save();
            return comment;
        } 
        catch (error) {
            console.log(error);
        }
    },
    deleteComment:  async(parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Comment = ctx.default.Comment;
            const deleted = await Comment.deleteOne({_id: args.id});
            return deleted.ok;
        } 
        catch (error) {
            console.log(error);    
        }
    }
}

const deleteComments = async(id, Comment) => {
    await Comment.deleteMany({post: id});
}

export default Mutation;