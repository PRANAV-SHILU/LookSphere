import express from "express";
import { verifyToken, verifyTokenOptional } from "../middlewares/auth.middleware.js";
import { addInteraction, getInteractionByPostId, getInteractionByUserId } from "../controllers/interaction.controller.js";


const interactionRouter = express.Router();


// get interaction for user :
// repost is public, like and save are private (only the owner can see in profile)
interactionRouter.get("/user/:userId", verifyTokenOptional, getInteractionByUserId);

// get interaction for post 
interactionRouter.get("/post/:postId", getInteractionByPostId);

// add interaction (like,save,repost)
interactionRouter.post("/", verifyToken, addInteraction);


export default interactionRouter;