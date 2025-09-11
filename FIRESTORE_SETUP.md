# Firestore Setup Guide for Split The Bill App

## 1. Create a Firestore Database
- Go to your Firebase project at https://console.firebase.google.com
- In the left sidebar, click **Firestore Database**
- Click **Create database** and choose production or test mode
- Select a Cloud Firestore location and click **Enable**

## 2. Recommended Firestore Collections & Structure

### Users
- **Collection:** `users`
- **Document ID:** Firebase Auth UID
- **Fields:**
  - `email`: string
  - `displayName`: string
  - `createdAt`: timestamp
  - `profilePic`: `[Optional]` string (path to the location profile pic is stored)

### Receipts
- **Collection:** `receipts`
- **Document ID:** auto-generated
- **Fields:**
  - `ownerId`: string (Firebase Auth UID)
  - `createdAt`: timestamp
  - `imageUrl`: string (optional, for uploaded receipt image)
  - `store`: object
    - `name`: string (e.g., "Walmart", "Joe's Diner")
    - `address`: `[Optional]` string
    - `phone`: `[Optional]` string
    - `storeId`: `[Optional]` string (Firebase Store UID)
    - `website`: `[Optional]` string
  - `items`: array of objects
    - `name`: string
    - `price`: number
    - `quantity`: number
    - `assignedTo`: array of objects
        - `personId`: string (person ID)
        - `quantity`: `[Optional]` number (amount assigned to the person)
        - `percentage`: `[Optional]`: number (percentage /100 assigned to the person)
  - `people`: array of objects
    - `id`: string
    - `name`: string

### Store (optional, to track stores/sellers)
- **Collection:** `stores`
- **Document ID:** auto-generated or storeId
- **Fields:**
  - `name`: string (store or seller name)
  - `website`: `[Optional]` string
  - `email`: `[Optional]` string
  - `type`: string (e.g., "restaurant", "retail", "online", "individual")
  - `locations`: `[Optional]` array of objects (for physical stores)
    - `address`: string
    - `city`: string
    - `state`: string
    - `zip`: string
    - `country`: string
    - `locationId`: `[Optional]` string
    - `phone`: `[Optional]` string
  - `notes`: `[Optional]` string

### People (optional, if you want to store separately)
- **Collection:** `people`
- **Document ID:** auto-generated or user-defined
- **Fields:**
  - `name`: string
  - `userId`: string (owner Firebase Auth UID)


## 3. Linking Data to Signed-In User
- When saving a receipt or person, always set the `ownerId` or `userId` field to the current user's Firebase Auth UID.
- To fetch receipts or people for the signed-in user, query Firestore where `ownerId` or `userId` equals the user's UID.
- Example query:
```js
// Get all receipts for current user
const receiptsRef = firestore.collection('receipts');
const userReceipts = receiptsRef.where('ownerId', '==', currentUser.uid).get();
```


## 4. Example Data Structure

```json
// receipts/{receiptId}
{
  "ownerId": "user123",
  "createdAt": "2025-08-24T12:00:00Z",
  "imageUrl": "https://...",
  "store": {
    "storeId": "walmart-001",
    "name": "Walmart",
    "website": "https://walmart.com",
    "phone": "555-123-4567",
    "address": "123 Main St",
  },
  "items": [
    { "name": "Burger", "price": "8.99", "quantity": 2, "assignedTo": {"personId": "personA"} },
    { "name": "Fries", "price": "3.49", "quantity": 1, "assignedTo": {"personId": "personB"} }
  ],
  "people": [
    { "id": "personA", "name": "Alice" },
    { "id": "personB", "name": "Bob" }
  ]
}

// stores/{storeId}
{
  "name": "Walmart",
  "website": "https://walmart.com",
  "phone": "555-123-4567",
  "type": "retail",
  "locations": [
    {
      "locationId": "loc-001",
      "address": "123 Main St",
      "city": "Springfield",
      "state": "IL",
      "zip": "62701",
      "country": "USA",
      "visitedAt": "2025-08-24T11:30:00Z"
    }
  ],
  "notes": "Favorite local store."
}
```

## 5. Security Rules
- Restrict access so users can only read/write their own receipts and people.
- Example rule:

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /receipts/{receiptId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /people/{personId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 6. Next Steps
- Add Firestore to your app using the Firebase JS SDK.
- Use the above structure to store and retrieve data for receipts, items, and people.
- Update security rules in the Firebase console for best practices.

---
If you need help with Firestore integration or rules, ask Copilot for code or troubleshooting.
