import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const Query = {
    me : (parent, args, ctx, info) => {
        if(!ctx.req.isAuth) {
            throw new Error('Unauthenticated');
        }
        return 'Pranil';
    },
    login : async (parent, args, ctx, info) => {
        try {
            const User = ctx.default.User;
            const user = await User.findOne({email: args.data.email});
            if(!user) {
                throw new Error('user doest exits');
            }
            const isEqual = await bcrypt.compare(args.data.password, user.password);
            if(!isEqual) {
                throw new Error('password is incorrect');
            }
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, {
                expiresIn: '1h'
            });

            return {
                _id: user.id, 
                token,
            }
        } 
        catch (error) {
            console.log(error);
        }
    },
    user: async (parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const User = ctx.default.User;
            const user = await User.findById(args.id);
            if(!user) {
                throw new Error('user not found');
            }
            return user;
        }
        catch(err) {
            console.log(err);
        }
    },
    post: async (parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Post = ctx.default.Post();
            const post = await Post.findById(args.id);
            if(!post) {
                throw new Error('post not found');
            }
            return post;
        }
        catch(err) {
            console.log(err);
        }
    },
    users : async(parent, args, ctx, info) => {
        if(!ctx.req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const User = ctx.default.User;
        const users = await User.find();
        return users;
    },
    posts : async(parent, args, ctx, info) => {
        if(!ctx.req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const Post = ctx.default.Post;
        const posts = await Post.find();
        return posts;
    },
    comment : async(parent, args, ctx, info) => {
        try {
            if(!ctx.req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const Comment = ctx.default.Comment;
            const comment = await Comment.findById(args.id);
            if(!comment) {
                throw new Error('comment not found');
            }
            return comment;
        }
        catch(err) {
            console.log(err);
        }
    }, 
    comments : async(parent, args, ctx, info) => {
        if(!ctx.req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const Comment = ctx.default.Comment;
        const comments = await Comment.find();
        return comments;
    }
}

export default Query;