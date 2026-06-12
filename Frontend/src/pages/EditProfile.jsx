import {
  Form,
  useLoaderData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../schema/editProfileSchema";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { User, Camera } from "lucide-react";
import { toast } from "react-toastify";
import BackButton from "../shared-components/BackButton";
import { EditProfile as EditProfileAnimation } from "../utils/animation";

export default function EditProfile() {
  const { data } = useLoaderData();
  const { user } = data || {};
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");

  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      tagline: user?.tagline || "",
      bio: user?.bio || "",
    },
    resolver: yupResolver(editProfileSchema),
    mode: "all",
  });

  const taglineValue = watch("tagline") || "";
  const bioValue = watch("bio") || "";

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
    <>
      <AnimatePresence>
        {isSubmitting && (
          <Motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            {...EditProfileAnimation.backdropTransition}
          >
            <Motion.div
              className="flex flex-col items-center gap-4 bg-[var(--surface-card)] border border-[var(--border-normal)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)] max-w-sm w-full mx-4 text-center"
              {...EditProfileAnimation.dialogTransition}
            >
              {/* Spinner animation */}
              <Motion.div
                className="w-12 h-12 rounded-full border-4 border-[var(--border-light)] border-t-[var(--primary-500)]"
                style={{ borderTopColor: "var(--primary-500)" }}
                {...EditProfileAnimation.spinnerTransition}
              />
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  Saving Profile
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Please wait, this might take a moment if you're uploading a new profile picture.
                </p>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.main
        className="w-full max-w-[600px] mx-auto pt-8 pb-16 px-4 md:px-8"
        {...EditProfileAnimation.pageTransition}
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

      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-6"
      >
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
            multiple={false}
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
          {errors.username && (
            <p
              style={{
                color: "var(--status-error)",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              {errors.username.message}
            </p>
          )}
        </div>

        {/* --- Email --- */}
        <div className="input-group">
          <label className="input-label">Email</label>
          <input type="email" className="input-field" {...register("email")} />
          {errors.email && (
            <p
              style={{
                color: "var(--status-error)",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* --- Tagline --- */}
        <div className="input-group">
          <label className="input-label">Tagline</label>
          <textarea
            className="input-field"
            rows={2}
            placeholder="A short line about you..."
            style={{ resize: "vertical" }}
            {...register("tagline")}
          />
          {errors.tagline && (
            <p
              style={{
                color: "var(--status-error)",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              {errors.tagline.message}
            </p>
          )}
          <div className="flex justify-between mt-1.5 px-0.5 text-xs text-[var(--text-muted)]">
            <span>A short line about you</span>
            <span style={{ color: taglineValue.length >= 80 ? "var(--status-error)" : "inherit", fontWeight: taglineValue.length >= 80 ? "600" : "normal" }}>
              {taglineValue.length}/80
            </span>
          </div>
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
          {errors.bio && (
            <p
              style={{
                color: "var(--status-error)",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              {errors.bio.message}
            </p>
          )}
          <div className="flex justify-between mt-1.5 px-0.5 text-xs text-[var(--text-muted)]">
            <span>Tell people about yourself</span>
            <span style={{ color: bioValue.length >= 300 ? "var(--status-error)" : "inherit", fontWeight: bioValue.length >= 300 ? "600" : "normal" }}>
              {bioValue.length}/300
            </span>
          </div>
        </div>

        {/* --- Submit --- */}
        <div className="flex gap-3 mt-2">
          <Motion.button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => navigate("/profile")}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? EditProfileAnimation.cancelButtonHover : {}}
            whileTap={!isSubmitting ? EditProfileAnimation.buttonTap : {}}
            transition={EditProfileAnimation.buttonTransition}
          >
            Cancel
          </Motion.button>
          <Motion.button
            type="submit"
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !isValid}
            whileHover={
              !isSubmitting && isValid ? EditProfileAnimation.saveButtonHover : {}
            }
            whileTap={!isSubmitting && isValid ? EditProfileAnimation.buttonTap : {}}
            transition={EditProfileAnimation.buttonTransition}
          >
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Motion.button>
        </div>
      </Form>
    </Motion.main>
    </>
  );
}
