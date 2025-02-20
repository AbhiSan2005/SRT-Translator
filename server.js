const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.static('/public'));

app.post("/upload", upload.single("srtFile"), async (req, res) => {
    if (!req.file || !req.body.targetLang) {
        return res.status(400).json({ error: "Missing file or target language." });
    }

    const filePath = req.file.path;
    const targetLang = req.body.targetLang;

    try {
        // Read the SRT file
        const srtContent = fs.readFileSync(filePath, "utf-8");

        // Split file into lines and process each line
        const srtLines = srtContent.split("\n");
        const translatedLines = [];

        for (const line of srtLines) {
            if (line.trim() === "" || !isNaN(line.trim()) || line.includes("-->")) {
                translatedLines.push(line); // Keep timestamps & numbers unchanged
            } else {
                try {
                    const translated = await translate(line, { to: targetLang });
                    translatedLines.push(translated.text);
                } catch (err) {
                    console.error("Translation error:", err);
                    translatedLines.push(line); // Keep original if translation fails
                }
            }
        }

        // Send translated SRT back as JSON
        res.json({ translatedSRT: translatedLines });

        // Delete the uploaded file after processing
        fs.unlinkSync(filePath);
    } catch (err) {
        console.error("File processing error:", err);
        res.status(500).json({ error: "Translation failed", details: err.message });
    }
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));