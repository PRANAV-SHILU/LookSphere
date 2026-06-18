import { fetchAllUsers } from "../services/userService.js";

export function creatorsLoader() {
  const creatorsPromise = fetchAllUsers()
    .then((res) => {
      const storedUser = localStorage.getItem("user");
      const existingUser = storedUser ? JSON.parse(storedUser) : null;

      const creatorsArray = Array.isArray(res) ? res : [];

      const filteredCreators = creatorsArray.filter(
        (user) => user.username !== existingUser?.username,
      );
      return filteredCreators;
    })
    .catch((err) => {
      console.log("creators loader error:", err);
      throw new Error("Failed to fetch creators. Please try again later.");
    });

  return { creatorsData: creatorsPromise };
}
