import { redirect } from "react-router-dom";

const url = "https://secureauth-api.onrender.com/users";

function capitalizeFullName(name) {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export async function registerAction({ request }) {
  const formData = await request.formData();

  //fetch and check does mobile already exists
  let response = await fetch(url);

  if (!response.ok) {
    throw response;
  }

  response = await response.json();

  const mobile = formData.get("mobile");

  const isMobileExists = response.some((user) => user.mobile === mobile);

  if (isMobileExists) {
    return { error: "Mobile number already exists" };
  }

  //sending new user detail to server
  const newUser = {
    id: (response.length + 1).toString(),
    name: capitalizeFullName(formData.get("name")),
    mobile,
    password: formData.get("password"),
    isLoggedIn: false,
  };

  const postResponse = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!postResponse.ok) {
    throw postResponse;
  }

  //redirecting user to login
  return redirect("/login?registered=success");
}
