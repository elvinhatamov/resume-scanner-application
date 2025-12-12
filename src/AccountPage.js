import React, { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { User, Phone, LogOut, ArrowLeft, Settings, FileText, Download, Calendar, HardDrive, Home, Upload, Target } from "lucide-react";

export default function AccountPage({ onBack }) {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [savedJobs, setSavedJobs] = useState([]);
  const [userResumes, setUserResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(false);
  const [resumesError, setResumesError] = useState("");

  const userName = auth.user?.profile?.name || "User";
  const userPhone = auth.user?.profile?.phone_number || "Not provided";

  const handleSignOut = () => {
    const clientId = "1hj5ncp9olo3kdpi5t5bjshjgb";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://us-east-1yrzlji1lk.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      setSavedJobs(Array.isArray(saved) ? saved : []);
    } catch (e) {
      setSavedJobs([]);
    }
  }, []);

  const removeSaved = (id) => {
    const updated = (savedJobs || []).filter((s) => s.id !== id);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  // API
  const API_BASE = "https://uvrpukveqb.execute-api.us-east-1.amazonaws.com/dev";
  const GET_USER_RESUMES = `${API_BASE}/get-user-resumes`;

  const fetchUserResumes = async () => {
    if (!auth?.user?.profile?.sub) return;
    setResumesLoading(true);
    setResumesError("");
    try {
      const userSub = auth.user.profile.sub;
      const res = await fetch(`${GET_USER_RESUMES}?user_sub=${encodeURIComponent(userSub)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user?.id_token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || res.statusText || 'Failed to fetch resumes');
      }

      const data = await res.json();
      setUserResumes(data.resumes || []);
    } catch (e) {
      console.error('Error loading resumes:', e);
      setResumesError(e.message || 'Failed to load resumes');
    } finally {
      setResumesLoading(false);
    }
  };

  // Fetch resumes when the tab becomes active
  useEffect(() => {
    if (activeTab === 'resumes') {
      fetchUserResumes();
    }
  }, [activeTab, auth?.user?.profile?.sub]);

  // Pre-fetch resumes when user signs in
  useEffect(() => {
    if (auth?.user?.profile?.sub) {
      fetchUserResumes();
    }
  }, [auth?.user?.profile?.sub]);

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
        </main>
      </div>
    </div>
  );
}
