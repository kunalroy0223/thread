import React, { useState } from "react";
import BlogTitleSubtitle from "./BlogTitleSubtitle";
import BlogContent from "./BlogContent";
import BlogPreview from "./BlogPreview";
import PostStatusModal from "./PostStatusModal";
import "../../styles/user/StartBlog.scss";

// Backend methods
import { createBlog } from "../../../backend/methods/CreateBlog";

// Upload files to backend
const uploadFiles = async (files) => {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const res = await fetch("http://192.168.45.190:5000/api/upload", { // LAN IP
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.files || []; // "files" from backend response
  } catch (err) {
    console.error("Upload failed:", err);
    return [];
  }
};

const StartBlog = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    content: "",
    mediaList: [], // { file, type } objects
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postStatus, setPostStatus] = useState("success"); // "success" | "error"

  const goToNextStep = (data) => {
    setBlogData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handlePost = async () => {
    try {
      setIsModalOpen(true);
      setPostStatus("success");

      // Step 1: Upload media to backend
      const files = blogData.mediaList.map((m) => m.file);
      const uploadedUrls = await uploadFiles(files);

      if (uploadedUrls.length === 0 && blogData.mediaList.length > 0) {
        console.warn("Some files were not uploaded properly");
      }

      // Merge uploaded URLs with type info
      const mediaListWithUrls = uploadedUrls.map((url, i) => ({
        url,
        type: blogData.mediaList[i]?.type || "image", // fallback
      }));

      // Step 2: Send blog data to Firestore
      const result = await createBlog({
        title: blogData.title,
        subtitle: blogData.subtitle,
        content: blogData.content,
        mediaList: mediaListWithUrls,
        coverImage: mediaListWithUrls[0]?.url || "", // first media as cover
        slug: blogData.title ? blogData.title.toLowerCase().replace(/\s+/g, "-") : "",
        status: "draft",
        tags: [],
      });

      setPostStatus(result.success ? "success" : "error");
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      setPostStatus("error");
    }
  };

  return (
    <section className="blog-container">
      <div className="b-container">
        {currentStep === 0 && (
          <>
            <h1>Start Your Blog</h1>
            <button onClick={() => setCurrentStep(1)}>
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M8 5l8 7-8 7V5z" />
              </svg>
            </button>
          </>
        )}

        {currentStep === 1 && <BlogTitleSubtitle onPrev={goToPrevStep} onNext={goToNextStep} />}
        {currentStep === 2 && <BlogContent onPrev={goToPrevStep} onNext={goToNextStep} />}
        {currentStep === 3 && <BlogPreview blogData={blogData} onPrev={goToPrevStep} onPost={handlePost} />}
      </div>

      <PostStatusModal
        isOpen={isModalOpen}
        status={postStatus}
        onClose={() => {
          setIsModalOpen(false);
          if (postStatus === "success") {
            setCurrentStep(0);
            setBlogData({ title: "", subtitle: "", content: "", mediaList: [] });
          }
        }}
      />
    </section>
  );
};

export default StartBlog;
