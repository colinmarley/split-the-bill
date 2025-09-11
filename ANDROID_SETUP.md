# Android Studio Emulator Setup for Expo React Native App

## 1. Install Android Studio
- You already have Android Studio Narwhal Feature Drop | 2025.1.2 Patch 1 installed.

## 2. Open Android Studio
- Launch Android Studio.

## 3. Install Android SDK & Tools
- Go to **Tools > SDK Manager**.
- Ensure you have the latest Android SDK (API 33 or higher) and Android SDK Platform Tools installed.

## 4. Create a Virtual Device (Emulator)
- Go to **Tools > Device Manager**.
- Click **Create Device**.
- Select a device model (e.g., Pixel 6, Pixel 4).
- Click **Next**.
- Select a system image (recommended: latest release, e.g., Android 13 or 14, x86_64).
- Click **Next** and then **Finish**.
- Your new device will appear in the Device Manager list.

## 5. Start the Emulator
- In Device Manager, click the **Play** button next to your virtual device.
- Wait for the emulator to boot up.

## 6. Connect Expo to the Emulator
- In your project folder, run:
  ```bash
  npx expo start
  ```
- In the Expo Dev Tools browser window, click **Run on Android device/emulator**.
- If the emulator is running, Expo will install and launch your app automatically.

## 7. Troubleshooting
- If Expo can't find the emulator, ensure:
  - The emulator is running and unlocked.
  - Android Studio's platform tools are installed and up to date.
  - Your computer's PATH includes the Android SDK platform-tools directory.
- You may need to restart Expo or the emulator if the connection fails.

## 8. Additional Tips
- You can create multiple virtual devices for different screen sizes and Android versions.
- Use the **AVD Manager** in Android Studio for advanced settings.

---
If you need help with any step, ask Copilot for troubleshooting or more details.
