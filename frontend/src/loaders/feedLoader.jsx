import { fetchFeed } from "../services/postService.js";
import { feedRefresher } from "../utils/feedRefresher.js";

export function feedLoader(limit = 10) {
  return async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";

    const feedPromise = fetchFeed(1, limit, search)
      .then(res => {
        const posts = res.data || [];
        return feedRefresher(posts);
      })
      .catch(err => {
        console.error("feedLoader error:", err);
        throw new Error("Failed to load feed. Please try again later.");
      });

    return { feedData: feedPromise };
  };
}
