const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure upload directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir(path.join(__dirname, "uploads/posts/images"));
ensureDir(path.join(__dirname, "uploads/posts/videos"));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mime = file.mimetype;
    if (mime.startsWith("image/")) cb(null, "uploads/posts/images");
    else if (mime.startsWith("video/")) cb(null, "uploads/posts/videos");
    else cb(new Error("Invalid file type"), null);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});
const upload = multer({ storage });

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve React frontend safely
const frontendBuildPath = path.join(__dirname, "../dist");
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  // Regex-based catch-all route instead of '*'
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

// Upload endpoint
app.post("/api/upload", upload.array("files"), (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ success: false, message: "No files uploaded" });

    const fileUrls = req.files.map((file) => {
      const folder = file.mimetype.startsWith("image/") ? "images" : "videos";
      return `/uploads/posts/${folder}/${file.filename}`;
    });

    return res.json({ success: true, urls: fileUrls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
