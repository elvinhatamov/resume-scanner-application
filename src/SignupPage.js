import React from "react";

export default function SignupPage({ onLogin }) {
  const clientId = "1hj5ncp9olo3kdpi5t5bjshjgb";
  const redirectUri = "http://localhost:3000"; 
  const domain = "https://us-east-1yrzlji1lk.auth.us-east-1.amazoncognito.com";

  const goToCognitoSignup = () => {
    const url = `${domain}/signup?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>

        <button
          onClick={goToCognitoSignup}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold mb-4 hover:bg-indigo-700"
        >
          Sign Up with Cognito
        </button>

        <button
          onClick={onLogin}
          className="text-indigo-600 hover:underline"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}
