// App.js
import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import LandingPage from "./LandingPage";
import ResumeUploadApp from "./ResumeUploadApp";
import AccountPage from "./AccountPage";

export default function App() {
  const auth = useAuth();
  const [showAccount, setShowAccount] = useState(false);

  // 🔄 While Cognito session loads
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg animate-pulse">
            <span className="text-white text-2xl font-bold">…</span>
          </div>
          <p className="text-gray-700 font-semibold">Loading authentication…</p>
        </div>
      </div>
    );
  }

  // ❌ Authentication Error
  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{auth.error.message}</p>
          <button
            onClick={() => auth.signinRedirect()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 🔐 Not logged in → show landing page with job listings
  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  // 🎉 AUTHENTICATED → show account or resume matcher
  if (showAccount) {
    return <AccountPage onBack={() => setShowAccount(false)} />;
  }

  return <ResumeUploadApp onAccountClick={() => setShowAccount(true)} />;
}
