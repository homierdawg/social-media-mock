import express from "express";
import { getFeedPosts, getUserPosts, likePost} from "../Controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { createPost } from "../Controllers/posts.js"
import { verify } from "jsonwebtoken";
import { getUser } from "../Controllers/users.js";

const router = express.Router();

//read 
router.get("/", verifyToken, getFeedPosts); 

router.get("/:userId/posts", verifyToken, getUserPosts);



//update
router.patch("/:id/like", verifyToken, likePost);   

export default router;
//confused why this is here? maybe pasted from the freaking index.js smh
// app.post("/posts", verifyToken, upload.single("picture"), createPost)
