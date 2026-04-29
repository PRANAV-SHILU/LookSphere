import { redirect } from "react-router-dom";

const url = "https://secureauth-api.onrender.com/users";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const mobile = formData.get("mobile");
  const password = formData.get("password");

  const res = await fetch(url);

  if (!res.ok) {
    throw res;
  }

  const users = await res.json();

  //checking whether user exists or not
  const user = users.find(
    (u) => u.mobile === mobile && u.password === password,
  );

  // return error if user not exists
  if (!user) {
    return { error: "Invalid mobile number or password." };
  }

  // change loggedin status to user
  const patchResponse = await fetch(`${url}/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isLoggedIn: true }),
  });

  if (!patchResponse.ok) {
    throw patchResponse;
  }

  localStorage.setItem("currentUserID", user.id);

  return redirect("/dashboard?loggedin=success");
}
