import { fetchAllUsers } from "../services/userService.js";

export function creatorsLoader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";

  const creatorsPromise = fetchAllUsers(search)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err.message || "Failed to fetch creators. Please try again later.");
    });

  return { creatorsData: creatorsPromise };
}
