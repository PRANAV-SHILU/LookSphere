/**
 * Interaction Utilities
 *
 * Reusable helper functions for optimistic updates and state synchronization
 * of post interactions (spark, reshare, archive, comment, impressions) across
 * feeds, profiles, modals, and detail pages.
 */

/**
 * Merges updated interaction counts and user status flags into a single post object.
 *
 * @param {Object|null} post - The post object to update.
 * @param {Object} updatedData - Object containing updated counts and/or has flags.
 * @param {Object} [updatedData.counts] - Updated interaction counts (spark, reshare, archive, comment, impression, etc.)
 * @param {Object} [updatedData.has] - Updated boolean flags (sparked, reshared, archived, etc.)
 * @returns {Object|null} A new post object with merged interaction data, or the original post if unchanged/null.
 */
export function updatePostInteractions(post, updatedData) {
  if (!post || !updatedData) return post;

  return {
    ...post,
    counts: {
      ...(post.counts || {}),
      ...(updatedData.counts || {}),
    },
    has: {
      ...(post.has || {}),
      ...(updatedData.has || {}),
    },
  };
}

/**
 * Updates a target (which can be a single post object, null, or an array of posts)
 * with the new interaction data for the post matching `postId`.
 *
 * Can be passed directly into React state setters:
 *   setSelectedPost((prev) => applyPostInteraction(prev, postId, updatedData));
 *   setPosts((prev) => applyPostInteraction(prev, postId, updatedData));
 *
 * @param {Object|Array|null} target - A single post object, null, or an array of post objects.
 * @param {string} postId - The ID of the post that was interacted with.
 * @param {Object} updatedData - The interaction data to apply { counts, has }.
 * @returns {Object|Array|null} The updated post, updated array of posts, or original target.
 */
export function applyPostInteraction(target, postId, updatedData) {
  if (!target || !updatedData) return target;

  if (Array.isArray(target)) {
    return target.map((p) =>
      p && p._id === postId ? updatePostInteractions(p, updatedData) : p
    );
  }

  // Target is a single post object
  if (!postId || target._id === postId) {
    return updatePostInteractions(target, updatedData);
  }

  return target;
}

/**
 * Synchronizes interaction updates across multiple React state setters at once.
 *
 * Example:
 *   syncPostInteraction([setSelectedPost, setImagesList, setVideosList], postId, updatedData);
 *
 * @param {Array<Function>} setters - Array of React setState dispatch functions.
 * @param {string} postId - The ID of the post that was interacted with.
 * @param {Object} updatedData - The interaction data to apply { counts, has }.
 */
export function syncPostInteraction(setters, postId, updatedData) {
  if (!Array.isArray(setters)) return;
  setters.forEach((setter) => {
    if (typeof setter === "function") {
      setter((prev) => applyPostInteraction(prev, postId, updatedData));
    }
  });
}

/**
 * Computes the next interaction counts and flags when toggling an action.
 *
 * @param {Object} counts - Current counts object { spark, reshare, archive, ... }
 * @param {Object} has - Current boolean flags { sparked, reshared, archived, ... }
 * @param {string} action - The action type ("spark", "reshare", "archive", etc.)
 * @returns {{ nextCounts: Object, nextHas: Object } | null}
 */
export function calculateNextInteraction(counts, has, action) {
  const actionConfig = {
    spark: { stateKey: "sparked", countKey: "spark" },
    sparked: { stateKey: "sparked", countKey: "spark" },
    reshare: { stateKey: "reshared", countKey: "reshare" },
    reshared: { stateKey: "reshared", countKey: "reshare" },
    archive: { stateKey: "archived", countKey: "archive" },
    archived: { stateKey: "archived", countKey: "archive" },
  };

  const target = actionConfig[action];
  if (!target) return null;

  const { stateKey, countKey } = target;
  const isCurrentlyActive = Boolean(has?.[stateKey]);

  const nextHas = {
    ...(has || {}),
    [stateKey]: !isCurrentlyActive,
  };

  const nextCounts = {
    ...(counts || {}),
    [countKey]: isCurrentlyActive
      ? Math.max(0, (counts?.[countKey] || 0) - 1)
      : (counts?.[countKey] || 0) + 1,
  };

  return { nextCounts, nextHas };
}
