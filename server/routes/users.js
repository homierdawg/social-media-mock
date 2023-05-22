import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../Controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const Router = express.Router();

//read
Router.get("/:id", verifyToken, getUser);
Router.get("/:id/friends", verifyToken, getUserFriends);


//update
Router.patch("/:id/:friendID", verifyToken, addRemoveFriend);

export default Router;