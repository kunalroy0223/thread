// backend/index.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");

const app = express();
const PORT = 5000;

// Helper to get LAN IP so other devices can access
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "127.0.0.1";
}
const LOCAL_IP = getLocalIp();

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

// Enable CORS for local dev
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload endpoint
app.post("/api/upload", upload.array("files"), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Construct accessible URLs
    const fileUrls = req.files.map((file) => {
      const folder = file.mimetype.startsWith("image/") ? "images" : "videos";
      return `http://${LOCAL_IP}:${PORT}/uploads/posts/${folder}/${file.filename}`;
    });

    return res.json({ success: true, urls: fileUrls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://${LOCAL_IP}:${PORT}`);
  console.log("📁 Uploaded files will be stored in /uploads/posts/images & /uploads/posts/videos");
});
