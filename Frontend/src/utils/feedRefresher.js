export function feedRefresher(posts) {
  // Retrieve seen posts from this session
  let seenIds = [];
  try {
    const storedSeen = sessionStorage.getItem("seenPostIds");
    seenIds = storedSeen ? JSON.parse(storedSeen) : [];
  } catch (e) {
    console.error("Error reading seenPostIds from session:", e);
  }

  // Partition posts
  const unseen = posts.filter((p) => !seenIds.includes(p._id));
  const seen = posts.filter((p) => seenIds.includes(p._id));

  // Fisher-Yates (Knuth) Shuffle Algorithm for perfect, unbiased randomness
  const shuffle = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return [...shuffle(unseen), ...shuffle(seen)];
}
