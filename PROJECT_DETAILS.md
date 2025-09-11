# Split the Bill: App Documentation

This document outlines the structure, features, and components for the "Split the Bill" mobile application.

---

## Screens

### 1) Splash Screen

A temporary screen displayed when the app is first launched.

**Detailed Breakdown:**
- The screen will feature the app's logo, which will animate while the app initializes in the background.
- During this time, the app will check for a user's authentication token.
- If a token is found and valid, the user will be navigated directly to the **Dashboard Screen**.
- If no token is found, the user will be directed to the **Login/Signup Screen**.

**Required Components:**
- `View`: A full-screen container.
- `Image`: To display the logo.
- `LottieAnimationView` (from `lottie-react-native`): For a smooth, lightweight loading animation.
- `StatusBar`: To control the status bar appearance.

**Suggested Features & Enhancements:**
- **App Version Display:** Show the app's version number discreetly at the bottom of the screen for easier debugging and support.
- **Dynamic Messaging:** Use this screen to display critical messages if needed (e.g., "App is under maintenance").

---

### 2) Login/Signup Screen

The entry point for unauthenticated users, allowing them to either log in or create a new account.

**Detailed Breakdown:**
- A segmented control or tabbed view will allow users to switch between "Login" and "Signup" forms.
- **Login Form:**
  - `Email` and `Password` input fields.
  - A "Forgot Password?" link to initiate a password reset flow.
  - A prominent "Login" button.
- **Signup Form:**
  - `Email`, `Password`, and `Confirm Password` input fields.
  - Fields for basic profile information like `First Name` and `Last Name`.
  - A "Sign Up" button.
- Both forms will have real-time validation to provide immediate feedback (e.g., "Invalid email format," "Passwords do not match").

**Required Components:**
- `KeyboardAvoidingView`: To ensure form inputs are not hidden by the on-screen keyboard.
- `TextInput`: For all input fields.
- `Button` / `TouchableOpacity`: For all interactive elements.
- `SegmentedControl` / `TabView`: To switch between login and signup modes.
- `Modal`: For the future feature of a walkthrough popover.
- **Custom Components:**
  - `AuthForm`: A reusable component that encapsulates the logic for both login and signup.
  - `FormInput`: A custom `TextInput` with built-in label and validation message display.

**Suggested Features & Enhancements:**
- **Social Logins:** Add buttons for "Sign in with Google" and "Sign in with Apple" for a faster, more convenient user experience.
- **Password Strength Indicator:** Show a visual indicator of password strength as the user types.
- **Biometric Login:** Allow users to log in using Face ID or Touch ID after their initial login.

---

### 3) Dashboard Screen

The main hub of the application, providing access to all core features and a summary of recent activity.

**Detailed Breakdown:**
- **Bottom Tab Navigator:** This will be the primary navigation method, always visible on the main screens. It will include icons for:
  - **Dashboard:** The home screen.
  - **Scan:** A central button to open the camera for OCR.
  - **Receipts:** A dedicated view of all receipts.
  - **People:** The people management screen.
  - **Profile/Settings:** A combined screen for user profile and app settings.
- **Receipts List:**
  - This will be a virtualized, scrollable list (`FlatList`) to handle a large number of receipts efficiently.
  - Each item in the list will be a tappable card showing key information.
  - A search bar will be pinned at the top to filter receipts by store name or other keywords.
  - Filter and sort options will be available via a dedicated button that opens a modal.

**Required Components:**
- `BottomTabNavigator` (from React Navigation).
- `FlatList`: For the scrollable list of receipts.
- `TextInput`: For the search bar.
- `Modal`: For the filter/sort options.
- **Custom Components:**
  - `ReceiptListItem`: A card component to display receipt summary information.
  - `FilterModal`: A reusable modal for setting filter and sort preferences.
  - `SkeletonLoader`: A placeholder component to show while receipts are being fetched.

**Suggested Features & Enhancements:**
- **Summary Cards:** At the top of the screen, display summary cards for "Total Spent This Month" or "Unsettled Balances."
- **Pull-to-Refresh:** Implement pull-to-refresh on the receipts list to fetch the latest data.
- **Quick Actions:** Use a long press on a receipt item to reveal quick actions like "Delete" or "Share."

---

### 4) Add Receipt Screen

A form-based screen for manually creating or editing a receipt.

**Detailed Breakdown:**
- **Store Information:** A dedicated section at the top. Tapping it will open a searchable dropdown/modal of previously used stores, or allow the user to enter a new one.
- **Receipt Items List:** A `FlatList` will display all items added to the receipt. Each item will have edit and delete buttons.
- **Add/Edit Item Modal:** A modal will be used for both adding a new item and editing an existing one. It will contain fields for `Item Name`, `Quantity`, and `Price`.
- **Save Button:** This button will be disabled until all required fields are valid. On press, it will save the entire receipt object to Firebase.

**Required Components:**
- `Modal`: For the add/edit item form.
- `FlatList`: For the list of receipt items.
- `TextInput`: For all form fields.
- `Picker` / `Dropdown`: For the receipt category selector.
- **Custom Components:**
  - `StoreSelector`: A component that combines a search input and a list for selecting or adding a store.
  - `ReceiptItemForm`: The form inside the modal for adding/editing an item.

**Suggested Features & Enhancements:**
- **OCR Integration:** An "Import from Photo" button that navigates to the camera/OCR screen to pre-fill the items list automatically.
- **Default Store Category:** Allow users to set a default category for a store (e.g., "Groceries" for "Walmart") to speed up receipt creation.
- **Real-time Calculations:** Show a running subtotal at the bottom of the screen that updates as items are added or edited.

---

### 5) People Screen (formerly Edit People)

A screen for managing the user's contacts within the app.

**Detailed Breakdown:**
- **Add Person:** A primary button will open a modal or navigate to a new screen with a form to add a new person. The form will include fields for `Name`, `Phone Number`, and optional payment info.
- **People List:** A searchable and sortable `FlatList` of all people. Each item will display the person's name, an icon/avatar, and a count of how many receipts they are associated with.

**Required Components:**
- `FlatList`: For the list of people.
- `Modal` or a new screen for the `AddPersonForm`.
- `TextInput`: For form fields and the search bar.
- **Custom Components:**
  - `PersonListItem`: A component for displaying a person's details in the list.
  - `AddPersonForm`: The form for creating or editing a person.

**Suggested Features & Enhancements:**
- **Contact Import:** Add a feature to import contacts directly from the user's phone.
- **Avatars:** Allow users to assign a profile picture or select a colored avatar for each person to make them more visually distinct.
- **Quick Communication:** Add buttons on each person's entry to quickly send them a message or payment request via their preferred app (Venmo, etc.).

---

### 6) Assign People Screen

A screen for assigning items from a receipt to different people.

**Detailed Breakdown:**
- **People Section:** A horizontal `FlatList` at the top will display the avatars of people added to the receipt. A "+" button will allow adding more people via a popover.
- **Receipt Info:** A summary section will display key receipt details.
- **Items List:** The main part of the screen will be a `FlatList` of receipt items.
  - Each item will be a card with a dropdown drawer.
  - The drawer will show who is assigned to that item and allow for new assignments.
  - The item will be visually disabled or "grayed out" once its quantity is fully assigned.
- **Save Button:** This button will be disabled until all items on the receipt are fully assigned. Pressing it will save the final assignments to Firebase and navigate to the **Receipt Summary Screen**.

**Required Components:**
- `FlatList` (one horizontal for people, one vertical for items).
- `Modal` / `Popover`: For selecting people to add.
- `Pressable` / `TouchableOpacity`: For the dropdown functionality.
- **Custom Components:**
  - `ItemAssignmentCard`: A complex card component that manages its own drawer state and displays assignment details.
  - `PeopleSelector`: A popover component for selecting people.

**Suggested Features & Enhancements:**
- **"Split Equally" Button:** A quick-action button to assign an item equally among all selected people.
- **Progress Indicator:** Each item card could have a visual progress bar showing how much of its quantity has been assigned.
- **Undo Action:** After making an assignment, show a temporary "Undo" toast/snackbar to allow users to quickly revert a mistake.

---

### 7) Receipt Summary Screen

A screen that provides a complete breakdown of a finished receipt, including individual costs.

**Detailed Breakdown:**
- **Store & Receipt Info:** A top section summarizing the store, date, and subtotal.
- **Personal Cost Breakdown:** A list of all people involved in the receipt. Each person will have a card showing:
  - Their assigned items and total cost.
  - An editable `Tax` and `Tip` percentage input that applies only to their portion.
- **Total Breakdown:** A final section showing the grand total of the receipt. It will include an editable master tax/tip percentage that can be applied to everyone.
- **Save Button:** This will lock in the tax and tip values and save the final, calculated totals to Firebase.

**Required Components:**
- `ScrollView`: As the content may be longer than the screen.
- `TextInput`: For the editable tax and tip fields.
- `Switch` / `Checkbox`: To toggle between global and individual tip settings.
- **Custom Components:**
  - `PersonSummaryCard`: A card to display an individual's cost breakdown.
  - `TotalSummaryCard`: A card for the final receipt totals.

**Suggested Features & Enhancements:**
- **Export/Share:** A button to export the summary as a PDF, image, or plain text to be easily shared.
- **"Send Reminder" Button:** Next to each person's summary, include a button to send them a notification or message with their total amount due.
- **Visualizations:** Use a simple pie chart or bar graph to visually represent how the total cost is distributed among the participants.

---

## Missing Screens & Information

- **Profile Screen:** A dedicated screen for the user to view their own information, change their password, and manage their profile picture.
- **Settings Screen:** A screen for managing app-level settings, such as notification preferences, theme (light/dark mode), and default currency.
- **Password Reset Flow:** The screens and logic required for a user to reset their password if they forget it.
- **Onboarding/Walkthrough:** A set of screens or modals to guide new users through the app's main features upon their first login.
- **All Receipts Screen:** The destination for the "Save all receipts" button is mentioned but not defined. This is likely the same as the Dashboard's receipt list but may need to be confirmed.
- **Camera/OCR Screen:** Details on the UI for the camera, how the user interacts with the scanned image, and how they confirm the OCR results before they are populated into the Add Receipt screen.
  
