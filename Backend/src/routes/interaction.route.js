import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { addInteraction, getInteractionByPostId, getInteractionByUserId } from "../controllers/interaction.controller";


const interactionRouter = express.Router();


// get interaction for user :
//------------------------------------------------------------------
//  need optional vlaidator for like and saved because only he can see this
//------------------------------------------------------------------

interactionRouter.get("/:userId?action", getInteractionByUserId);

// get interaction for post 
interactionRouter.get("/:postId?action", getInteractionByPostId);

// add interaction (like,save,repost)
interactionRouter.post("/", verifyToken, addInteraction);


export default interactionRouter;