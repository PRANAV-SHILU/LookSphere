import { fetchAllUsers } from "../services/userService.js";

export function creatorsLoader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";

  const creatorsPromise = fetchAllUsers(search)
    .then((res) => {
      // const storedUser = localStorage.getItem("user");
      // const existingUser = storedUser ? JSON.parse(storedUser) : null;

      // const creatorsArray = Array.isArray(res) ? res : [];

      // const filteredCreators = creatorsArray.filter(
      //   (user) => user.username !== existingUser?.username,
      // );
      // return filteredCreators;
      return res;
    })
    .catch(() => {
      throw new Error("Failed to fetch creators. Please try again later.");
    });

  return { creatorsData: creatorsPromise };
}
