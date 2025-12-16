# Rhombuzz - Patient Management Dashboard

A modern healthcare patient management system built with React, Firebase, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Email/password authentication using Firebase Auth
- 📊 **Dashboard**: Interactive charts and statistics for patient visits
- 👥 **Patient Management**: Track and manage patient visit statistics
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Fully responsive design for all devices

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Charts**: Recharts
- **Backend**: Firebase (Authentication & Firestore)
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rhombuzz
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Create a Firestore database
   - Copy your Firebase configuration

4. Configure Firebase:
   - Update `src/lib/firebase.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   Or use environment variables (recommended):
   - Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Set up Firestore:
   - Create a collection named `visitStats`
   - Each document should have:
     - `month`: String in format "YYYY-MM" (e.g., "2024-12")
     - `totalVisits`: Number
     - `uniquePatients`: Number

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
rhombuzz/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── DashboardHeader.jsx
│   │   ├── login-form.jsx
│   │   └── theme-toggle.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── useAuth.js
│   │   └── use-mobile.ts
│   ├── lib/                # Utilities and configs
│   │   ├── auth.js         # Firebase auth functions
│   │   ├── firebase.js     # Firebase configuration
│   │   └── utils.ts        # Utility functions
│   ├── pages/              # Page components
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardSideBar.tsx
│   │   │   └── Patients.jsx
│   │   └── login/
│   │       └── Login.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
├── vite.config.js
└── tsconfig.json
```

## Features Overview

### Authentication
- Secure email/password login
- Protected routes
- Session management with Firebase Auth

### Dashboard
- **Sidebar Navigation**: 
  - Patients
  - Appointments
  - Communication
  - Survey
  - Payment
  - Manage Users
  - Sign Out
- **Header**: 
  - Sidebar toggle button
  - Dark/Light mode toggle

### Patients Page
- **Statistics Cards**: 
  - Total Visits
  - Total Unique Patients
- **Interactive Chart**: 
  - Bar chart showing monthly visit statistics
  - Toggle between Total Visits and Unique Patients
  - Tooltips on hover
- **Add Statistics**: 
  - Dialog form to add new monthly statistics
  - Month picker
  - Total visits input
  - Unique patients input

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Firebase Setup

1. **Authentication**:
   - Go to Firebase Console → Authentication
   - Enable "Email/Password" sign-in method

2. **Firestore Database**:
   - Create a Firestore database
   - Create collection: `visitStats`
   - Document structure:
     ```javascript
     {
       month: "2024-12",        // String: "YYYY-MM"
       totalVisits: 32,         // Number
       uniquePatients: 23       // Number
     }
     ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, please contact the development team.
