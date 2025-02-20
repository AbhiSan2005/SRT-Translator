import { useState } from "react";
import UploadSRT from "./components/UploadSRT";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // SVG icons

function App() {
    const [translatedLines, setTranslatedLines] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    // Dynamic styles for dark and light mode
    const appStyles = {
        backgroundColor: darkMode ? "#121212" : "#f8f9fa",
        color: darkMode ? "#ffffff" : "#333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.3s ease, color 0.3s ease",
    };

    return (
        <div style={appStyles}>
            {/* Dark Mode Toggle Button */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                    padding: "8px 16px",
                    margin: "10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: darkMode ? "#f8f9fa" : "#121212",
                    color: darkMode ? "#121212" : "#ffffff",
                }}
            >
                {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>

            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SRT Translator</h1>
            
            <UploadSRT onTranslate={setTranslatedLines} />

            {translatedLines.length > 0 && (
                <div style={{ marginTop: "20px", width: "80%", maxWidth: "600px" }}>
                    <h2>Translated SRT</h2>
                    {translatedLines.map((line, index) => (
                        <textarea
                            key={index}
                            value={line}
                            onChange={(e) => {
                                const newLines = [...translatedLines];
                                newLines[index] = e.target.value;
                                setTranslatedLines(newLines);
                            }}
                            rows={2}
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                padding: "8px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                backgroundColor: darkMode ? "#222" : "#fff",
                                color: darkMode ? "#fff" : "#000",
                            }}
                        />
                    ))}
                    <button
                        onClick={() => console.log("Final Output:", translatedLines)}
                        style={{
                            padding: "10px",
                            marginTop: "10px",
                            backgroundColor: darkMode ? "#333" : "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Download Translated SRT
                    </button>
                </div>
            )}

            {/* Footer */}
            <footer style={{ marginTop: "20px", padding: "10px", textAlign: "center" }}>
                <p>Follow me:</p>
                <a
                    href="https://github.com/AbhiSan2005"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: "10px", color: darkMode ? "#fff" : "#007bff", fontSize: "24px" }}
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/abhiraj-sankpal-06b216320/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: darkMode ? "#fff" : "#007bff", fontSize: "24px" }}
                >
                    <FaLinkedin />
                </a>
            </footer>
        </div>
    );
}

export default App;