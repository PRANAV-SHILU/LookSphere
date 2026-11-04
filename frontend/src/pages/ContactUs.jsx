import { useRef, useContext, useEffect } from "react";
import {
  Form,
  Link,
  useNavigation,
  useSubmit,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  MessageSquare,
  User,
  Mail,
  ChevronDown,
  Send,
  ImagePlus,
  Video,
  X,
  Loader2,
  Headset,
  HelpCircle,
  ClipboardList,
  Search,
  CheckCircle2,
  ArrowRight,
  Inbox,
  Info,
} from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { BackButton } from "../shared-components/shared-components";
import { ContactFormContext } from "../context/ContactFormContext";
import { contactSchema } from "../schema/contactSchema";
import { useState } from "react";

const CATEGORY_OPTIONS = [
  { value: "general", label: "General" },
  { value: "feedback", label: "Feedback" },
  { value: "suggestion", label: "Suggestion & Improvement" },
  { value: "issue", label: "Issue & Bug Report" },
  { value: "security", label: "Security Concern" },
  { value: "inquiry", label: "Hiring / Business Inquiry" },
];

export default function ContactUs() {
  useDocumentMetadata("Contact Us", "Get in touch with the LookSphere team. Send feedback, report issues, or inquire about business opportunities directly to developer Pranav Shilu.");

  const navigation = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    formData,
    setFormData,
    imageFiles,
    setImageFiles,
    videoFile,
    setVideoFile,
    imagePreviews,
    setImagePreviews,
    videoPreview,
    setVideoPreview,
  } = useContext(ContactFormContext);

  const [errors, setErrors] = useState({});

  // Helper to update text fields easily
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImageFiles = files.filter((f) => f.type.startsWith("image/"));

    const spaceLeft = 5 - imageFiles.length;
    const filesToAdd = newImageFiles.slice(0, spaceLeft);

    if (filesToAdd.length > 0) {
      setImageFiles((prev) => [...prev, ...filesToAdd]);

      const newPreviews = filesToAdd.map((f) => URL.createObjectURL(f));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }

    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // Handle video selection
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  // Clear form on success
  useEffect(() => {
    if (actionData?.success) {
      let user = null;
      try {
        const stored = localStorage.getItem("user");
        if (stored) user = JSON.parse(stored);
      } catch {
        // ignore
      }

      setFormData({
        name: user?.username || "",
        email: user?.email || "",
        category: "general",
        message: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      setVideoFile(null);
      setVideoPreview(null);
    }
  }, [
    actionData,
    setFormData,
    setImageFiles,
    setImagePreviews,
    setVideoFile,
    setVideoPreview,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await contactSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          if (!newErrors[error.path]) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("category", formData.category);
    data.append("message", formData.message);

    let user = null;
    try {
      const stored = localStorage.getItem("user");
      if (stored) user = JSON.parse(stored);
    } catch {
      // ignore
    }

    if (!user || !user._id) {
      toast.info("You must be logged in to submit a contact form.");
      navigate("/login");
      return;
    }

    data.append("userId", user._id);

    imageFiles.forEach((file) => {
      data.append("images", file);
    });

    if (videoFile) {
      data.append("video", videoFile);
    }

    submit(data, { method: "post", encType: "multipart/form-data" });
  };

  // Shared input styles
  const inputStyle = {
    backgroundColor: "var(--surface-input)",
    borderColor: "var(--border-normal)",
    color: "var(--text-primary)",
  };

  const focusHandlers = {
    onFocus: (e) => {
      e.target.style.borderColor = "var(--primary-500)";
      e.target.style.boxShadow = "0 0 0 3px rgba(var(--primary-500-rgb), 0.15)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "var(--border-normal)";
      e.target.style.boxShadow = "none";
    },
  };

  return (
    <div className="w-full justify-center flex">
      <div className="px-2 pt-8 pb-20 w-full max-w-2xl xsm:px-4 md:px-8">
        {/* Header Row */}
        <div className="mb-8 justify-between flex items-center">
          <BackButton />
          <span className="px-3 py-1 text-xs font-semibold rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 uppercase tracking-wider dark:text-blue-400">
            Contact
          </span>
        </div>

        {/* Title */}
        <div className="flex-col mb-10 text-center flex items-center">
          <div
            className="mb-4 w-12 h-12 rounded-2xl justify-center text-(--primary-600) flex items-center"
            style={{ backgroundColor: "var(--primary-50)" }}
          >
            <MessageSquare size={24} />
          </div>
          <h1
            className="mb-3 text-3xl font-extrabold md:text-4xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Contact Us
          </h1>
          <p
            className="text-sm max-w-xl mx-auto sm:text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Have a question, suggestion, or need support? We'd love to hear from
            you. Fill out the form below and we'll get back to you.
          </p>
          {/* All-in-one keyword badges */}
          <div className="flex-wrap gap-2.5 mt-5 justify-center flex items-center">
            {[
              {
                label: "Contact",
                icon: MessageSquare,
                gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
                shadow: "rgba(99, 102, 241, 0.3)",
              },
              {
                label: "Support",
                icon: Headset,
                gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
                shadow: "rgba(16, 185, 129, 0.3)",
              },
              {
                label: "Inquiry",
                icon: Search,
                gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
                shadow: "rgba(245, 158, 11, 0.3)",
              },
              {
                label: "Help",
                icon: HelpCircle,
                gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
                shadow: "rgba(236, 72, 153, 0.3)",
              },
              {
                label: "Request",
                icon: ClipboardList,
                gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                shadow: "rgba(139, 92, 246, 0.3)",
              },
            ].map((badge) => (
              <span
                key={badge.label}
                className="gap-1.5 px-3.5 py-1.5 text-[11px] font-bold rounded-full text-white inline-flex items-center uppercase tracking-wider cursor-default select-none hover:scale-105 transition-transform duration-200"
                style={{
                  background: badge.gradient,
                  boxShadow: `0 2px 8px ${badge.shadow}`,
                }}
              >
                <badge.icon size={13} strokeWidth={2.5} />
                {badge.label}
              </span>
            ))}
          </div>

          {/* Quick link to My Inquiries */}
          <div
            className="gap-1.5 px-3.5 py-1.5 mt-6 text-xs rounded-full border inline-flex items-center sm:text-sm transition-al8"
            style={{
              backgroundColor: "var(--surface-input)",
              borderColor: "var(--border-normal)",
              color: "var(--text-secondary)",
            }}
          >
            <span>Already submitted an inquiry?</span>
            <Link
              to="/my-inquiries"
              className="gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors inline-flex items-center"
            >
              <span>Track here</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Success Confirmation Card */}
        {actionData?.success && (
          <div
            className="flex-col mb-8 p-5 gap-4 rounded-2xl border shadow-sm sm:p-6 flex sm:flex-row items-start transition-all animate-fadeIn"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "rgba(16, 185, 129, 0.4)",
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 justify-center border border-emerald-500/20 dark:text-emerald-400 flex items-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div className="flex-1">
              <h2 className="mb-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
                Inquiry Submitted Successfully!
              </h2>
              <p
                className="mb-3 text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Your message has been received. You will receive all admin responses directly on the{" "}
                <Link
                  to="/my-inquiries"
                  className="font-semibold text-emerald-600 underline dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  My Inquiries
                </Link>{" "}
                page and a notification email will also be sent to your inbox.
              </p>
              <Link
                to="/my-inquiries"
                className="gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white! bg-emerald-600 shadow-md inline-flex items-center sm:text-sm hover:text-white! no-underline hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all hover:shadow-emerald-500/20"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                <Inbox size={15} style={{ color: "#ffffff" }} />
                <span>View in My Inquiries</span>
                <ArrowRight size={15} style={{ color: "#ffffff" }} />
              </Link>
            </div>
          </div>
        )}

        {/* Form */}
        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="flex-col gap-5 flex"
        >
          {/* Name */}
          <div className="flex-col gap-1.5 flex">
            <label
              htmlFor="contact-name"
              className="gap-1.5 text-xs font-bold uppercase tracking-wider flex items-center"
              style={{ color: "var(--text-muted)" }}
            >
              <User size={14} />
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="px-4 py-3 w-full rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
              style={inputStyle}
              {...focusHandlers}
            />
            {errors.name && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "var(--status-error)" }}
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex-col gap-1.5 flex">
            <label
              htmlFor="contact-email"
              className="gap-1.5 text-xs font-bold uppercase tracking-wider flex items-center"
              style={{ color: "var(--text-muted)" }}
            >
              <Mail size={14} />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="px-4 py-3 w-full rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2"
              style={inputStyle}
              {...focusHandlers}
            />
            {errors.email && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "var(--status-error)" }}
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex-col gap-1.5 flex">
            <label
              htmlFor="contact-category"
              className="gap-1.5 text-xs font-bold uppercase tracking-wider flex items-center"
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronDown size={14} />
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-category"
                name="category"
                required
                disabled={isSubmitting}
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="px-4 py-3 w-full rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                style={inputStyle}
                {...focusHandlers}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.value === ""}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="top-1/2 absolute right-4 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
            {errors.category && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "var(--status-error)" }}
              >
                {errors.category}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="flex-col gap-1.5 flex">
            <div className="justify-between flex items-center">
              <label
                htmlFor="contact-message"
                className="gap-1.5 text-xs font-bold uppercase tracking-wider flex items-center"
                style={{ color: "var(--text-muted)" }}
              >
                <MessageSquare size={14} />
                Message <span className="text-red-500">*</span>
              </label>
              <span
                className="text-[10px] font-medium tracking-wide"
                style={{
                  color:
                    formData.message.length > 1000
                      ? "#ef4444"
                      : "var(--text-muted)",
                }}
              >
                {formData.message.length} / 1000
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              required
              disabled={isSubmitting}
              rows={5}
              placeholder="Tell us what's on your mind..."
              value={formData.message}
              onChange={(e) => {
                updateField("message", e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="px-4 py-3 w-full rounded-xl border text-sm font-medium overflow-hidden min-h-30 transition-all focus:outline-none focus:ring-2 resize-none disabled:cursor-not-allowed disabled:opacity-60"
              style={inputStyle}
              {...focusHandlers}
            />
            {errors.message && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "var(--status-error)" }}
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Optional Uploads */}
          <div className="flex-col gap-3 flex">
            <p
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Attachments{" "}
              <span
                className="font-medium normal-case tracking-normal"
                style={{ color: "var(--text-muted)" }}
              >
                (optional)
              </span>
            </p>

            <div
              className="flex-col p-5 gap-4 rounded-2xl border flex transition-all"
              style={{
                backgroundColor: "var(--surface-input)",
                borderColor: "var(--border-normal)",
              }}
            >
              {/* Empty State: Big Dropzones */}
              {imagePreviews.length === 0 && !videoPreview && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all text-center group ${isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-blue-500/5 hover:border-blue-500/50"}`}
                  >
                    <div
                      className="w-12 h-12 rounded-full justify-center flex items-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: "var(--surface-background)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <ImagePlus
                        size={22}
                        className="group-hover:text-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Add Images
                      </span>
                      <p
                        className="mt-1 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Select up to 5 images
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all text-center group ${isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-purple-500/5 hover:border-purple-500/50"}`}
                  >
                    <div
                      className="w-12 h-12 rounded-full justify-center flex items-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: "var(--surface-background)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <Video
                        size={22}
                        className="group-hover:text-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Add Video
                      </span>
                      <p
                        className="mt-1 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Select 1 video max
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Gallery State: Horizontal Strip of Media */}
              {(imagePreviews.length > 0 || videoPreview) && (
                <div className="flex-wrap gap-4 flex items-center">
                  {/* Render Image Previews */}
                  {imagePreviews.map((src, idx) => (
                    <div
                      key={src}
                      className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm border relative group sm:w-28 sm:h-28"
                      style={{ borderColor: "var(--border-normal)" }}
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={`Upload ${idx}`}
                      />
                      <div className="bg-black/50 opacity-0 justify-center absolute inset-0 group-hover:opacity-100 transition-opacity flex items-center backdrop-blur-[2px]">
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          disabled={isSubmitting}
                          className="w-8 h-8 bg-red-500 rounded-full justify-center text-white shadow-lg hover:bg-red-600 flex items-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Render Video Preview */}
                  {videoPreview && (
                    <div
                      className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm border relative group sm:w-28 sm:h-28"
                      style={{ borderColor: "var(--border-normal)" }}
                    >
                      <video
                        src={videoPreview}
                        aria-label="Contact attachment LookSphere"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                      />
                      <div className="p-2 bg-linear-to-t absolute inset-0 from-black/60 to-transparent pointer-events-none flex items-end">
                        <Video size={16} className="text-white/90" />
                      </div>
                      <div className="bg-black/50 opacity-0 justify-center absolute inset-0 group-hover:opacity-100 transition-opacity flex items-center backdrop-blur-[2px]">
                        <button
                          type="button"
                          onClick={removeVideo}
                          disabled={isSubmitting}
                          className="w-8 h-8 bg-red-500 rounded-full justify-center text-white shadow-lg hover:bg-red-600 flex items-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add More Buttons */}
                  <div className="flex-col gap-2 flex shrink-0">
                    {imagePreviews.length < 5 && (
                      <label
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all group ${isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/50"}`}
                        title="Add more images"
                      >
                        <ImagePlus
                          size={18}
                          className="text-(--text-muted) group-hover:text-blue-500 transition-colors"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          disabled={isSubmitting}
                          className="hidden"
                        />
                      </label>
                    )}
                    {!videoPreview && (
                      <label
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all group ${isSubmitting ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/50"}`}
                        title="Add video"
                      >
                        <Video
                          size={18}
                          className="text-(--text-muted) group-hover:text-purple-500 transition-colors"
                        />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          disabled={isSubmitting}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="gap-2 px-6 py-3.5 mt-2 w-full justify-center rounded-xl text-sm font-bold text-white border-none shadow-md bg-blue-600 flex items-center uppercase tracking-wider cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>

          {/* Response Delivery Notice */}
          <div
            className="gap-2.5 p-3.5 mt-1 rounded-xl border text-xs flex items-start leading-relaxed"
            style={{
              backgroundColor: "var(--surface-input)",
              borderColor: "var(--border-normal)",
            }}
          >
            <Info size={16} className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Where to track responses:</strong> Admin replies to your inquiries will be delivered directly to your{" "}
              <Link
                to="/my-inquiries"
                className="font-semibold text-emerald-600 underline dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                My Inquiries
              </Link>{" "}
              page.
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
