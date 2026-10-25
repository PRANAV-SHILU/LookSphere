import { redirect } from "react-router-dom";
import { fetchProfile } from "../services/userService.js";

export function profileLoader({ params }) {
  const { username } = params || {};
  const stored = localStorage.getItem("user");
  const loggedInUser = stored ? JSON.parse(stored) : null;
  const isOwn = !username || (loggedInUser && loggedInUser.username === username);

  if (!username && !loggedInUser) {
    return redirect("/login");
  }

  const profilePromise = fetchProfile(username)
    .then((res) => {
      // If fetching own profile (no username param or matches logged-in user), keep localStorage in sync
      const fetchedUser = res?.data?.user || res?.user;

      if (
        loggedInUser &&
        fetchedUser &&
        (!username || username === loggedInUser.username || fetchedUser._id === loggedInUser._id)
      ) {
        const updated = { ...loggedInUser, ...fetchedUser };
        localStorage.setItem("user", JSON.stringify(updated));
      }

      return res;
    })
    .catch((err) => {
      console.error("profileLoader error:", err);

      // If viewing own profile and network fails or server error occurs, fallback to cached localStorage user
      if (isOwn && loggedInUser) {
        return {
          data: {
            user: loggedInUser,
            images: [],
            videos: [],
          },
          isOfflineFallback: true,
        };
      }

      throw new Error(err.message || "Failed to fetch profile. Please try again later.");
    });

  return {
    profileData: profilePromise,
    cachedUser: isOwn ? loggedInUser : null,
  };
}
