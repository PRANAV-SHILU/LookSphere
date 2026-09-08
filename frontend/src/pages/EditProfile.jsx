import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { useRef, useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../schema/editProfileSchema";

import { User, Camera, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import BackButton from "../shared-components/BackButton";

export default function EditProfile() {
  const { data } = useLoaderData();
  useDocumentMetadata("Edit Profile", "Customize your LookSphere profile. Update your avatar, bio, and personal details to stand out in the community created by developer Pranav Shilu.", true);
  const { user } = data || {};
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");
  const taglineTextareaRef = useRef(null);
  const bioTextareaRef = useRef(null);

  const {
    register,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      tagline: user?.tagline || "",
      bio: user?.bio || "",
    },
    resolver: yupResolver(editProfileSchema),
    mode: "all",
  });

  const taglineValue = useWatch({ control, name: "tagline" }) || "";
  const bioValue = useWatch({ control, name: "bio" }) || "";

  const { ref: taglineFormRef, ...taglineRest } = register("tagline");
  const { ref: bioFormRef, ...bioRest } = register("bio");

  useEffect(() => {
    if (taglineTextareaRef.current) {
      taglineTextareaRef.current.style.height = "auto";
      taglineTextareaRef.current.style.height = `${taglineTextareaRef.current.scrollHeight}px`;
    }
  }, [taglineValue]);

  useEffect(() => {
    if (bioTextareaRef.current) {
      bioTextareaRef.current.style.height = "auto";
      bioTextareaRef.current.style.height = `${bioTextareaRef.current.scrollHeight}px`;
    }
  }, [bioValue]);

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
        {isSubmitting && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          >
            <div
              className="flex flex-col items-center gap-4 border p-8 max-w-sm w-full mx-4 text-center"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-normal)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Spinner animation */}
              <div
                className="w-12 h-12 rounded-full border-4 animate-spin"
                style={{
                  borderColor: "var(--border-light)",
                  borderTopColor: "var(--primary-500)",
                }}
              />
              <div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Saving Profile
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Please wait, this might take a moment if you're uploading a
                  new profile picture.
                </p>
              </div>
            </div>
          </div>
        )}

      <main
        className="w-full max-w-150 mx-auto pt-8 pb-16 px-4 md:px-8"
      >
        <div className="flex w-full justify-between items-center mb-8">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-wide"
            style={{ color: "var(--text-primary)", marginBottom: 0 }}
          >
            Edit Profile
          </h1>
          <div className="shrink-0 ml-auto">
            <BackButton />
          </div>
        </div>

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
                  alt={`Profile image: ${user?.username}${user?.tagline ? ' - ' + user?.tagline : ''}`}
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



          {/* --- Tagline --- */}
          <div className="input-group">
            <label className="input-label">Tagline</label>
            <textarea
              className="input-field"
              rows={2}
              placeholder="A short line about you..."
              style={{ resize: "none", overflow: "hidden" }}
              {...taglineRest}
              ref={(e) => {
                taglineFormRef(e);
                taglineTextareaRef.current = e;
              }}
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
            <div className="flex justify-between mt-1.5 px-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>A short line about you</span>
              <span
                style={{
                  color:
                    taglineValue.length >= 80
                      ? "var(--status-error)"
                      : "inherit",
                  fontWeight: taglineValue.length >= 80 ? "600" : "normal",
                }}
              >
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
              style={{ resize: "none", overflow: "hidden" }}
              {...bioRest}
              ref={(e) => {
                bioFormRef(e);
                bioTextareaRef.current = e;
              }}
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
            <div className="flex justify-between mt-1.5 px-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>Tell people about yourself</span>
              <span
                style={{
                  color:
                    bioValue.length >= 300 ? "var(--status-error)" : "inherit",
                  fontWeight: bioValue.length >= 300 ? "600" : "normal",
                }}
              >
                {bioValue.length}/300
              </span>
            </div>
          </div>

          {/* --- Submit --- */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="btn btn-secondary w-full transition-transform active:scale-95 hover:scale-[1.02]"
              onClick={() => navigate("/profile")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 hover:scale-[1.02]"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </Form>

          {/* --- Account Security Links --- */}
          <div className="mt-8 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Account Security
            </p>
            <Link
              to="/settings/change-email"
              className="flex items-center gap-3 p-3.5 rounded-xl border transition-colors duration-200 group"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-normal)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                <Mail size={18} style={{ color: "var(--primary-500)" }} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Change Email</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Update the email linked to your account</span>
              </div>
              <ArrowRight size={16} className="ml-auto shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--text-muted)" }} />
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 p-3.5 rounded-xl border transition-colors duration-200 group"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-normal)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
              >
                <Lock size={18} style={{ color: "#8b5cf6" }} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Change Password</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Update your current password</span>
              </div>
              <ArrowRight size={16} className="ml-auto shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--text-muted)" }} />
            </Link>
          </div>
      </main>
    </>
  );
}
