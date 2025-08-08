import jwt from 'jsonwebtoken';
import ApiResponse from '../services/ApiResponse';
import AsyncHandler from '../services/AsyncHandler';

export const verifyJwt = AsyncHandler((req,res,next) => {
    const token = req.header("Authorization")?.spilt("")[1];
    if(!token) return ApiResponse.error(401,"Unthorized Request!!");

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return ApiResponse.success(401,"Invalid Token");
    }
});