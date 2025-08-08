import { Post } from "../models/Post";
import ApiResponse from "../services/ApiResponse";
import AsyncHandler from "../services/AsyncHandler";

const createPost = AsyncHandler(async(req,res)=>{
    const post = new Post({...req.body,author:req.user.id});
    await post.save();
    res.json(ApiResponse(201,"Success",post));
});

const getPosts = AsyncHandler(async(req,res)=>{
    const posts = await Post.find().populate("author","username");
    res.json(ApiResponse(201,"sucess",posts));
});

const getPostById = AsyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id).populate("author","username");
    if(!post){
        return res.json(ApiResponse.error(201,"NOt exist"));
    }
    res.json(ApiResponse.success(201,"sucess",post));
});
export {createPost,getPosts,getPostById};