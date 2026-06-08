import { getAllUsers, createUser, updateUser } from "../network/userApi";

export async function loginUser(mobile, password) {
  const users = await getAllUsers();

  const user = users.find(
    (u) => u.mobile === mobile && u.password === password,
  );

  if (!user) {
    return { success: false, error: "Invalid mobile number or password." };
  }

  await updateUser(user.id, { isLoggedIn: true });

  return { success: true, userId: user.id };
}

export async function registerUser(name, mobile, password) {
  const users = await getAllUsers();

  const isMobileExists = users.some((u) => u.mobile === mobile);

  if (isMobileExists) {
    return { success: false, error: "Mobile number already exists" };
  }

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    mobile,
    password,
    isLoggedIn: false,
  };

  await createUser(newUser);

  return { success: true };
}

export async function logoutUser(userId) {
  await updateUser(userId, { isLoggedIn: false });
}
