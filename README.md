# SRT Translator

A **React + Express** web application that allows users to upload an `.srt` subtitle file, translate it into multiple languages using **Google Translate API**, edit the translated content, and download the modified SRT file.

## Features
- Upload `.srt` subtitle files.
- Choose from **30+ languages** for translation.
- Translate subtitles **line by line** while preserving timestamps.
- Edit translated subtitles before downloading.
- Toggle **Dark Mode / Light Mode** for better accessibility.
- Download the translated `.srt` file.

---

## Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/YourUsername/srt-translator.git
cd srt-translator
```

### Backend Setup (Express Server)
```bash
cd backend
npm install
```

Start the backend server:
```bash
npm start
```
By default, the backend runs on **http://localhost:3000/**

### Frontend Setup (React App)
```bash
cd ../frontend
npm install
```

Start the React development server:
```bash
npm run dev
```
By default, the frontend runs on **http://localhost:5173/**

---

## How to Use
1. **Upload** an `.srt` file.
2. **Select a target language** from the dropdown.
3. Click **Translate** to process the subtitles.
4. **Edit** the translated text if needed.
5. Click **Download Translated SRT** to save your file.

---

## Tech Stack
- **Frontend:** React (Vite), CSS
- **Backend:** Node.js, Express.js
- **Translation API:** Google Translate API

---

## Contributing
Feel free to **fork** this repository and submit a pull request with improvements! 🛠️

---

## License
This project is **open-source** and available under the [MIT License](LICENSE).

---

## Connect with Me
[![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github)](https://github.com/AbhiSan2005)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/abhiraj-sankpal-06b216320/)
