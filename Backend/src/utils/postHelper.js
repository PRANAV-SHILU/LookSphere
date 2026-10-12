import interaction from "../models/interaction.model.js";

export const enrichPostsWithInteractions = async (posts, currentUserId) => {
  if (!posts || (Array.isArray(posts) && posts.length === 0)) return posts;

  const isArray = Array.isArray(posts);
  const postsArray = isArray ? posts : [posts];
  const postIds = postsArray.map((p) => p._id);

  // Covered index query: index { userId: 1, postId: 1, action: 1 } satisfies query completely in RAM
  const userActionMap = {};
  if (currentUserId) {
    const userInteractions = await interaction
      .find(
        { userId: currentUserId, postId: { $in: postIds } },
        { postId: 1, action: 1, _id: 0 },
      )
      .lean();

    userInteractions.forEach((i) => {
      const pId = i.postId.toString();
      if (!userActionMap[pId]) userActionMap[pId] = {};
      userActionMap[pId][i.action] = true;
    });
  }

  const enrichedPosts = postsArray.map((post) => {
    const postObj = post.toObject ? post.toObject() : post;
    const pId = postObj._id.toString();
    const userActions = userActionMap[pId] || {};

    return {
      ...postObj,
      counts: {
        spark: postObj.counts?.spark || 0,
        archive: postObj.counts?.archive || 0,
        reshare: postObj.counts?.reshare || 0,
        comment: postObj.counts?.comment || 0,
      },
      has: {
        sparked: Boolean(userActions.spark),
        archived: Boolean(userActions.archive),
        reshared: Boolean(userActions.reshare),
      },
    };
  });

  return isArray ? enrichedPosts : enrichedPosts[0];
};
