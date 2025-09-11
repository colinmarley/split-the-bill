# Split The Bill App Setup Guide

## 1. Install Dependencies
Run this in your project folder:
```
npm install @react-navigation/native @react-navigation/stack react-redux @reduxjs/toolkit firebase expo-camera expo-image-picker
```

## 2. Firebase Setup
- Go to https://console.firebase.google.com and create a new project.
- Enable Authentication (Email/Google).
- Enable Firestore Database.
- Download your config files (`google-services.json` for Android, `GoogleService-Info.plist` for iOS).
- Add your Firebase config to the app (instructions will follow in code comments).

## 3. OCR Setup
- For OCR, use `expo-image-picker` to get images and integrate with a cloud OCR API (Google Vision, Azure, or Tesseract via serverless function).
- Expo does not support native ML Kit OCR out of the box. You may need to use a REST API for OCR.

## 4. Project Structure
- `/src/components`: UI components
- `/src/redux`: Redux slices and store
- `/src/navigation`: Navigation setup
- `/src/utils`: OCR and Firebase helpers

## 5. Next Steps
- Implement authentication, camera, OCR, and Redux logic as described in the code skeletons.
- See code comments for integration points.

---
If you need help with any step, ask Copilot for code or troubleshooting.
