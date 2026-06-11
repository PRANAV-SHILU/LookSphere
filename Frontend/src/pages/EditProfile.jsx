import { Form, useLoaderData, useNavigation, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../utils/editProfileSchema";
import { motion as Motion } from "framer-motion";
import { User, Camera } from "lucide-react";
import { toast } from "react-toastify";
import BackButton from "../shared-components/BackButton";

export default function EditProfile() {
  const { data } = useLoaderData();
  const { user } = data || {};
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");

  const { register, formState: { errors, isValid } } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      tagline: user?.tagline || "",
      bio: user?.bio || "",
    },
    resolver: yupResolver(editProfileSchema),
    mode: "all",
  });

  useEffect(() => {
    if (actionData?.error) toast.error(actionData.error);
    if (actionData?.success) toast.success("Profile updated successfully!");
  }, [actionData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10 MB.");
      e.target.value = "";
      return;
    }
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <Motion.main
      className="w-full max-w-[600px] mx-auto pt-8 pb-16 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      <h1
        className="text-2xl md:text-3xl font-bold tracking-wide mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Edit Profile
      </h1>

      <Form method="post" encType="multipart/form-data" className="flex flex-col gap-6">

        {/* --- Profile Image --- */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <div
            className="relative w-28 h-28 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer group"
            style={{
              backgroundColor: "var(--surface-input)",
              borderColor: "var(--border-strong)",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} style={{ color: "var(--text-muted)" }} />
            )}
            {/* Overlay on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            >
              <Camera size={22} color="#fff" />
            </div>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Click to change photo · Max 10 MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            name="profileImage"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* --- Username --- */}
        <div className="input-group">
          <label className="input-label">Username</label>
          <input
            type="text"
            className="input-field"
            {...register("username")}
          />
          {errors.username && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.username.message}</p>}
        </div>

        {/* --- Email --- */}
        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            className="input-field"
            {...register("email")}
          />
          {errors.email && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.email.message}</p>}
        </div>

        {/* --- Tagline --- */}
        <div className="input-group">
          <label className="input-label">Tagline</label>
          <input
            type="text"
            className="input-field"
            placeholder="A short line about you..."
            {...register("tagline")}
          />
          {errors.tagline && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.tagline.message}</p>}
        </div>

        {/* --- Bio --- */}
        <div className="input-group">
          <label className="input-label">Bio</label>
          <textarea
            className="input-field"
            rows={4}
            placeholder="Tell people about yourself..."
            style={{ resize: "vertical" }}
            {...register("bio")}
          />
          {errors.bio && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.bio.message}</p>}
        </div>

        {/* --- Submit --- */}
        <div className="flex gap-3 mt-2">
          <Motion.button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => navigate("/profile")}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.01, opacity: 0.75 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            transition={{ duration: 0.15 }}
          >
            Cancel
          </Motion.button>
          <Motion.button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting || !isValid}
            whileHover={!isSubmitting && isValid ? { scale: 1.01, opacity: 0.85 } : {}}
            whileTap={!isSubmitting && isValid ? { scale: 0.98 } : {}}
            transition={{ duration: 0.15 }}
          >
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Motion.button>
        </div>
      </Form>
    </Motion.main>
  );
}
