import { redirect } from "react-router-dom";
import { uploadUserPost } from "../services/postService";
import { toast } from "react-toastify";

export async function uploadAction({ request }) {
  const formData = await request.formData();
  const mediaFile = formData.get("media");
  const mediaType = formData.get("type"); // "Image" or "Video"
  const caption = formData.get("caption") || "";
  const altText = formData.get("altText") || "";

  try {
    const payload = new FormData();
    payload.append("media", mediaFile);
    payload.append("mediaType", mediaType);
    payload.append("caption", caption);
    payload.append("altText", altText);


    await uploadUserPost(payload);
    toast.success("Post uploaded successfully!");
  } catch (err) {
    toast.error(err.message || "Failed to upload post.");
  }

  return redirect("/profile");
}
