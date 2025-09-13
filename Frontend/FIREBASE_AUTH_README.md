# Firebase Authentication Integration

This project now includes Firebase Authentication with the following features:

## ✅ Features Implemented

- **Email/Password Authentication**: Sign up and login with email and password
- **Google Authentication**: Sign in with Google account 
- **Authentication State Management**: Persistent user sessions
- **Profile Management**: Update user display name
- **Secure Logout**: Proper session termination

## 🚀 Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider (add your OAuth 2.0 credentials)

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click on the web app or create one
4. Copy the configuration object

### 3. Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id  
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### 4. Install Dependencies & Run

```bash
npm install
npm run dev
```

## 📁 New Files Added

- `src/config/firebaseConfig.ts` - Firebase initialization
- `src/services/authService.ts` - Authentication functions  
- `src/vite-env.d.ts` - TypeScript environment types
- `.env.example` - Environment variables template

## 🔧 Updated Files

- `src/App.tsx` - Replaced mock auth with real Firebase auth
- `src/components/auth-page.tsx` - Updated to use Firebase auth functions

## 🔐 Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is safe to commit as it contains no real credentials
- Firebase client SDK is safe for frontend use - API keys are not secret

## 🧪 Testing

You can test the authentication with:
- Create a new account with email/password
- Login with existing credentials  
- Use Google Sign-In (if configured)
- Test logout functionality

The demo login button will attempt to log in with `demo@legallens.com` / `demo123` - you'll need to create this account first or update the credentials.