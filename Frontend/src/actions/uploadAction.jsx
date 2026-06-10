import { redirect } from "react-router-dom";

export async function uploadAction({ request }) {
  const formData = await request.formData();
  const mediaFile = formData.get("media");
  const mediaType = formData.get("type"); // "image" or "video"

  // TODO: Call your actual userApi/userService here
  console.log("Simulating upload for:", mediaType, mediaFile);
  
  // X-Media-Type - have to send in headers for size validation on backend

  // Return a redirect to refresh the loader, or just null
  return redirect("/profile");
}
