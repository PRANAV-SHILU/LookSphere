import { fetchFeed } from "../services/postService.js";
import { feedRefresher } from "../utils/feedRefresher.js";

export async function feedLoader() {
  try {
    const res = await fetchFeed();
    const posts = res.data || [];
    return feedRefresher(posts);
  } catch (err) {
    console.error("feedLoader error:", err);
    throw new Error("Failed to load feed. Please try again later.");
  }
}
