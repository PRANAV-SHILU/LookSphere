import {
  toggleInteraction,
  getUserInteractions,
  getPostInteractions,
} from "../network/interactionApi";

export const interactionService = {
  toggleInteraction: async (postId, action) => {
    try {
      return await toggleInteraction(postId, action);
    } catch (error) {
      console.error("Error in interactionService.toggleInteraction:", error);
      throw error;
    }
  },

  getUserInteractions: async (userId, action) => {
    try {
      return await getUserInteractions(userId, action);
    } catch (error) {
      console.error("Error in interactionService.getUserInteractions:", error);
      throw error;
    }
  },

  getPostInteractions: async (postId, action) => {
    try {
      return await getPostInteractions(postId, action);
    } catch (error) {
      console.error("Error in interactionService.getPostInteractions:", error);
      throw error;
    }
  },
};
