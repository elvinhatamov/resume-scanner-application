import React from "react";
import { useAuth } from "react-oidc-context";
import { LogIn, Mail } from "lucide-react";

export default function LoginPage({ onSignup }) {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative animated circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300 opacity-5 rounded-full blur-3xl" />

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-t-4 border-indigo-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-4 shadow-lg animate-pulse">
            <Mail className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-gray-600 font-semibold text-lg">Resume Job Matcher</p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => auth.signinRedirect()}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold mb-4 hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
        >
          <LogIn size={24} />
          Sign In with Cognito
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          <span className="text-sm text-gray-500 font-medium">or</span>
          <div className="flex-1 h-px bg-gradient-to-l from-gray-300 to-transparent" />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={onSignup}
          className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg font-bold hover:bg-indigo-50 transition transform hover:scale-105"
        >
          Create a New Account
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8 text-center font-medium">
          🔒 Secure authentication powered by AWS Cognito
        </p>
      </div>
    </div>
  );
}
