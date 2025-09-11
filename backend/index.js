const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../dist")));

// API routes first
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Catch-all -> send React index.html for anything else
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
