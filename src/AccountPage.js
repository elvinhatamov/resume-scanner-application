import React from "react";
import { useAuth } from "react-oidc-context";
import { User, Home, Upload, Target, LogOut } from "lucide-react";

export default function AccountPage({ onBack }) {
  const auth = useAuth();

  const userName = auth.user?.profile?.name || "User";
  const logoutUri = window.location.origin;

  const handleSignOut = async () => {
    try {
      // Clear any stored data and sign out at Cognito so session cookies are cleared
      localStorage.clear();
      sessionStorage.clear();
      await auth.signoutRedirect({
        post_logout_redirect_uri: logoutUri,
        extraQueryParams: {
          logout_uri: logoutUri,
        },
      });
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback: remove local session and redirect home
      await auth.removeUser().catch(() => {});
      window.location.href = logoutUri;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-indigo-600">Resume Job Matcher</div>
          <span className="text-slate-600">Account</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <User size={16} className="text-indigo-600" />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer" onClick={onBack}>
              <Home size={20} />
              Dashboard
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer">
              <Upload size={20} />
              Upload Resume
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer">
              <Target size={20} />
              My Matches
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 rounded-lg">
              <User size={20} />
              Account
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
              <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <p className="text-slate-900">{userName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <p className="text-slate-900">{auth.user?.profile?.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Role/Target Job Title</label>
                <p className="text-slate-900">Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferences</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Desired Roles</label>
                <p className="text-slate-900">Front-end Developer, Full-stack Developer</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Locations</label>
                <p className="text-slate-900">San Francisco, Remote</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Salary Range</label>
                <p className="text-slate-900">$80k - $120k</p>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Security</h3>
            <div className="space-y-3">
              <button className="text-indigo-600 hover:text-indigo-800">Change Password</button>
              <div>
                <label className="block text-sm font-medium text-slate-700">Connected Accounts</label>
                <p className="text-slate-900">Google, LinkedIn</p>
              </div>
            </div>
          </div>

          {/* Sign Out Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Sign Out</h3>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
