import { useState, useRef } from "react";

const languages = [
    { code: "af", name: "Afrikaans" }, { code: "sq", name: "Albanian" },
    { code: "ar", name: "Arabic" }, { code: "bn", name: "Bengali" },
    { code: "zh", name: "Chinese" }, { code: "cs", name: "Czech" },
    { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" },
    { code: "en", name: "English" }, { code: "fi", name: "Finnish" },
    { code: "fr", name: "French" }, { code: "de", name: "German" },
    { code: "el", name: "Greek" }, { code: "hi", name: "Hindi" },
    { code: "id", name: "Indonesian" }, { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" }, { code: "ko", name: "Korean" },
    { code: "ms", name: "Malay" }, { code: "no", name: "Norwegian" },
    { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" },
    { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" },
    { code: "es", name: "Spanish" }, { code: "sv", name: "Swedish" },
    { code: "tr", name: "Turkish" }, { code: "uk", name: "Ukrainian" },
    { code: "ur", name: "Urdu" }, { code: "vi", name: "Vietnamese" }
];

const UploadSRT = ({ onTranslate }) => {
    const [file, setFile] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState("es"); // Default: Spanish
    const [translatedLines, setTranslatedLines] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("srtFile", file);
        formData.append("targetLang", targetLanguage);

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Translation failed.");
            }

            const translatedData = await response.json();
            console.log("✅ Translation Successful:", translatedData);

            if (translatedData.translatedSRT) {
                setTranslatedLines(translatedData.translatedSRT);
                onTranslate(translatedData.translatedSRT);
            } else {
                console.error("Unexpected API response:", translatedData);
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const handleDownload = () => {
        if (translatedLines.length === 0) {
            alert("No translated content available.");
            return;
        }

        const srtContent = translatedLines.join("\n");
        const blob = new Blob([srtContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "translated_srt.srt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ border: "2px dashed gray", padding: "20px", textAlign: "center" }}>
            <p onClick={handleButtonClick} style={{ marginBottom: "10px", cursor: "pointer" }}>
                Drag & drop an SRT file here, or{" "}
                <span style={{ textDecoration: "underline" }}>click to select one</span>
            </p>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".srt"
                onChange={handleFileChange}
            />

            {file && <p>Selected file: {file.name}</p>}

            {/* Language Selector */}
            <label htmlFor="language-select">Select Target Language:</label>
            <select
                id="language-select"
                onChange={(e) => setTargetLanguage(e.target.value)}
                value={targetLanguage}
                style={{ margin: "10px 0", padding: "5px", width: "100%" }}
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>

            <button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px" }}>
                Translate
            </button>

            {/* Only show the download button if there is translated content */}
            {translatedLines.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <button onClick={handleDownload} style={{ padding: "10px" }}>
                        Download Translated SRT
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadSRT;