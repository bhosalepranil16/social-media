import jwt from 'jsonwebtoken';

export const isAuthenticated = async (resolve, parent, args, ctx, info) => {
    try {
        const authHeader = ctx.req.get('Authorization');
        if(!authHeader) {
            ctx.req.isAuth = false;
            const result = await resolve(parent, args, ctx, info);
            return result;
        }
        const token = authHeader.split(' ')[1];
        if(!token || token === '') {
            ctx.req.isAuth = false;
            const result = await resolve(parent, args, ctx, info);
            return result;
        }
        let decodedToken = jwt.verify(token, process.env.SECRET);
        if(!decodedToken) {
            ctx.req.isAuth = false;
            const result = await resolve(parent, args, ctx, info);
            return result;
        }
        ctx.req.isAuth = true;
        ctx.req._id = decodedToken._id;
        const result = await resolve(parent, args, ctx, info);
        return result;
    } 
    catch (error) {
        ctx.req.isAuth = false;
        const result = await resolve(parent, args, ctx, info);
        return result;    
    }
}