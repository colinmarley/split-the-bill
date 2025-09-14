# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

# Split the Bill

A cross-platform app to help groups split receipts and track who owes what. Built with React Native, Expo, and Firebase.

## Features

- **Login/Signup:** Secure authentication for users.
- **Add Receipt:** Enter store info and receipt items manually or via photo/OCR.
- **Assign People:** Add people to a receipt and assign items to each person, with quantity support.
- **Assignment Drawer:** See and edit who is assigned to each item. Prevents over-assignment.
- **Receipt Summary:** View a breakdown of costs per person, including tax/tip. Save final totals to Firebase.
- **Dashboard:** See all your receipts and their status.

## Code Flow

1. **Login/Signup:** Users authenticate and create accounts. Real-time validation and social login options.
2. **Add Receipt:** Users input store details and items. Items can be added/edited via modal forms.
3. **Assign People:** Users add people, then assign items to each person. UI prevents duplicate or excess assignments. Save button is enabled only when all items are fully assigned.
4. **Receipt Summary:** Shows per-person breakdown, editable tax/tip, and grand total. Save locks in values and updates Firebase.
5. **Dashboard:** Users view all receipts, with options to view, edit, or delete.

## Tech Stack

- React Native (Expo)
- Firebase Firestore
- TypeScript

## Setup

See `SETUP.md` and `FIRESTORE_SETUP.md` for environment and database setup instructions.

## Contributing

Pull requests welcome! See issues for feature requests and bugs.

---

For more details, see [PROJECT_DETAILS.md](PROJECT_DETAILS.md).
