# KnightBridge

> **"Your buddy, your way"** — a cross-platform mobile app that connects students with activity partners in real time.

[![Expo](https://img.shields.io/badge/Expo-52-blue?logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue?logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-11.4-orange?logo=firebase)](https://firebase.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the App](#running-the-app)
6. [Firebase Configuration](#firebase-configuration)
7. [App Navigation](#app-navigation)
8. [Database Schema](#database-schema)
9. [Testing](#testing)
10. [Scripts](#scripts)
11. [Contributing](#contributing)

---

## About the Project

**KnightBridge** is a social companion app designed for students on campus. It solves a common problem — wanting to study, play sports, or grab a meal with someone but not knowing who is available. Users browse activity categories, select their preferences, and are automatically matched with another student looking for the same thing at the same time and place. Matches are delivered as real-time in-app notifications.

The app is built as a cross-platform **React Native / Expo** application and runs on **iOS**, **Android**, and the **Web** from a single codebase.

---

## Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Email/password sign-up and login via Firebase Auth |
| 🤝 **Activity Matching** | Real-time peer matching across three activity categories |
| 📚 **Studying** | Find study partners by subject and campus location |
| ⚽ **Sports** | Find teammates by sport and facility |
| 🍽️ **Dining** | Find dining companions by campus venue |
| 🔔 **Inbox / Notifications** | Persistent real-time match notifications with dismiss support |
| ⚙️ **Settings** | Update display name, username, password, and log out |
| 🌙 **Dark / Light Mode** | Automatic theme switching based on device preference |
| 📱 **Cross-Platform** | Runs on iOS, Android, and Web from a single codebase |

### Activity Options

**Studying**
- Subjects: Math, CS, Physics, Chemistry, Biology, Engineering, Business
- Locations: Library (Floors 1–3), Student Center, Engineering Building, Science Building

**Sports**
- Sports: Basketball, Soccer, Tennis, Volleyball, Swimming
- Locations: Recreation Center, Main Gym, Outdoor Courts, Tennis Courts, Pool

**Eating / Dining**
- Locations: Food Court, Campus Cafe, University Center, Dining Hall, Campus Market

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React Native](https://reactnative.dev) 0.76 + [Expo](https://expo.dev) 52 |
| Language | [TypeScript](https://www.typescriptlang.org) 5.8 (strict mode) |
| Routing | [Expo Router](https://expo.github.io/router/) 4 (file-based routing) |
| Navigation | React Navigation — Bottom Tabs + Stack |
| Backend / Auth | [Firebase](https://firebase.google.com) 11 — Authentication + Realtime Database |
| Animations | React Native Reanimated 3 |
| Gradients | Expo Linear Gradient / React Native Linear Gradient |
| Icons | Expo Vector Icons (Ionicons, Octicons, SimpleLineIcons) |
| Dropdowns | React Native Dropdown Picker |
| Gestures | React Native Gesture Handler |
| Testing | Jest 29 + jest-expo + React Test Renderer |

---

## Project Structure

```
KnightBridge/
└── KnightBridgeApp/          # Main Expo application
    ├── app/                  # File-based routes (Expo Router)
    │   ├── index.tsx         # Welcome / entry screen
    │   ├── login.tsx         # Login screen
    │   ├── signup.tsx        # Sign-up screen
    │   ├── loading.tsx       # Animated loading screen
    │   ├── +not-found.tsx    # 404 fallback
    │   ├── _layout.tsx       # Root navigation layout
    │   ├── (tabs)/           # Bottom-tab screens
    │   │   ├── _layout.tsx   # Tab bar configuration
    │   │   ├── homepage.tsx  # Activity selection hub
    │   │   ├── inbox.tsx     # Match notifications
    │   │   └── settings.tsx  # User profile & settings
    │   └── activities/       # Activity detail screens
    │       ├── studying.tsx
    │       ├── studying-details.tsx
    │       ├── sports.tsx
    │       ├── sports-details.tsx
    │       ├── eating.tsx
    │       └── eating-details.tsx
    ├── components/           # Reusable UI components
    │   ├── ThemedText.tsx
    │   ├── ThemedView.tsx
    │   ├── ParallaxScrollView.tsx
    │   ├── Collapsible.tsx
    │   ├── HapticTab.tsx
    │   ├── ui/               # Platform-specific UI primitives
    │   └── __tests__/        # Component unit tests
    ├── constants/
    │   └── Colors.ts         # Design-system color tokens
    ├── hooks/                # Custom React hooks
    │   ├── useColorScheme.ts
    │   └── useThemeColor.ts
    ├── assets/               # Fonts and images
    ├── firebaseConfig.ts     # Firebase initialisation & exports
    ├── app.json              # Expo app configuration
    ├── tsconfig.json         # TypeScript configuration
    └── package.json          # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

Make sure the following tools are installed on your machine:

- **Node.js** ≥ 18 — [nodejs.org](https://nodejs.org)
- **npm** ≥ 9 (bundled with Node.js)
- **Expo CLI** — installed automatically via `npx`
- **Expo Go** app on your physical device *(optional — for testing on a real device)*
- **Android Studio** with an Android Virtual Device *(optional — for Android emulator)*
- **Xcode** *(macOS only — for iOS simulator)*

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vedpatel-12/KnightBridge.git
cd KnightBridge/KnightBridgeApp

# 2. Install dependencies
npm install
```

### Running the App

```bash
# Start the Expo development server (interactive menu)
npm start

# Open directly on a specific platform
npm run ios       # iOS Simulator (macOS only)
npm run android   # Android Emulator
npm run web       # Browser at http://localhost:8081
```

After running `npm start`, scan the QR code displayed in the terminal with the **Expo Go** app on your device to run it on a physical phone.

---

## Firebase Configuration

The app connects to a Firebase project for authentication and real-time data. The configuration is located in `KnightBridgeApp/firebaseConfig.ts` and is initialised once at app startup.

```typescript
// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "knightbridge-e6791.firebaseapp.com",
  databaseURL: "https://knightbridge-e6791-default-rtdb.firebaseio.com",
  projectId: "knightbridge-e6791",
  // ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   // Firebase Authentication
export const db   = getDatabase(app); // Realtime Database
```

> **To use your own Firebase project**, replace the values in `firebaseConfig.ts` with those from your Firebase console (`Project Settings → Your apps → Firebase SDK snippet`). Enable **Email/Password** sign-in under *Authentication → Sign-in method* and enable the **Realtime Database**.

---

## App Navigation

```
Root Layout
├── Welcome Screen (index.tsx)
│   ├── Login  (login.tsx)
│   └── Sign Up (signup.tsx)
│
└── Main App — Bottom Tabs
    ├── 🏠 Home     (homepage.tsx)   ← activity selection + matching
    │   ├── Studying (activities/studying.tsx → studying-details.tsx)
    │   ├── Sports   (activities/sports.tsx   → sports-details.tsx)
    │   └── Eating   (activities/eating.tsx   → eating-details.tsx)
    ├── 🔔 Inbox    (inbox.tsx)       ← real-time match notifications
    └── ⚙️  Settings (settings.tsx)   ← profile management
```

### Matching Flow

1. User opens the **Home** tab and selects an activity category.
2. On the details screen the user picks a subject/sport/location from the dropdowns.
3. Tapping **Connect** writes the user's preferences to the Firebase Realtime Database.
4. The app listens for other users with matching preferences.
5. When two or more users match, both receive an in-app notification in their **Inbox**.
6. Both users are removed from the active queue after a successful match.

---

## Database Schema

The Firebase Realtime Database uses the following structure:

```
(root)
├── users/
│   └── {uid}/
│       ├── activity    : "studying" | "sports" | "eating"
│       ├── sport       : "basketball" | "soccer" | ...  (sports only)
│       ├── email       : string
│       └── timestamp   : ISO 8601 string
│
├── sports/
│   └── {sport}/
│       └── members/
│           └── {uid}/
│               ├── email     : string
│               └── timestamp : ISO 8601 string
│
└── notifications/
    └── {uid}/
        └── {notificationId}/
            ├── type      : "match"
            ├── message   : string
            └── timestamp : ISO 8601 string
```

---

## Testing

The project uses **Jest** with the `jest-expo` preset.

```bash
# Run tests once
npx jest

# Run tests in watch mode
npm test
```

Test files live alongside the components they test:

```
components/
└── __tests__/
    ├── ThemedText-test.tsx
    └── __snapshots__/
```

---

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `expo start` | Start the Expo dev server |
| `android` | `expo start --android` | Open on Android emulator |
| `ios` | `expo start --ios` | Open on iOS simulator |
| `web` | `expo start --web` | Open in browser |
| `test` | `jest --watchAll` | Run Jest in watch mode |
| `lint` | `expo lint` | Run the Expo linter |
| `reset-project` | `node ./scripts/reset-project.js` | Scaffold a fresh project |

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`.

Please follow the existing code style (TypeScript strict mode, React Native StyleSheet for styling) and ensure all existing tests pass before submitting.

---

<p align="center">Built with ❤️ using Expo & Firebase</p>
