import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Search, Briefcase, MapPin, DollarSign, LogIn } from "lucide-react";

export default function LandingPage() {
  const auth = useAuth();
  const [searchFilter, setSearchFilter] = useState("");

  // Sample job listings
  const allJobs = [
    {
      id: 1,
      title: "Senior Cloud Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$180K - $220K",
      description: "Design and build scalable cloud infrastructure for millions of users.",
      tags: ["AWS", "Kubernetes", "Python"],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$160K - $200K",
      description: "Build modern web applications using React and Node.js.",
      tags: ["React", "Node.js", "Azure"],
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Arlington, VA",
      salary: "$140K - $180K",
      description: "Manage and optimize cloud infrastructure and CI/CD pipelines.",
      tags: ["AWS", "Docker", "Terraform"],
    },
    {
      id: 4,
      title: "Machine Learning Engineer",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$200K - $250K",
      description: "Build AI/ML models for recommendation and ranking systems.",
      tags: ["Python", "TensorFlow", "PyTorch"],
    },
    {
      id: 5,
      title: "Backend Engineer",
      company: "Netflix",
      location: "Los Gatos, CA",
      salary: "$170K - $210K",
      description: "Design distributed systems serving millions of concurrent users.",
      tags: ["Java", "Microservices", "AWS"],
    },
    {
      id: 6,
      title: "Frontend Engineer",
      company: "Apple",
      location: "Cupertino, CA",
      salary: "$150K - $190K",
      description: "Create beautiful and responsive user interfaces for Apple products.",
      tags: ["JavaScript", "React", "Swift"],
    },
  ];

  // Filter jobs by title or company
  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      job.company.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header/Navbar */}
      <div className="bg-white shadow-sm border-b-2 border-indigo-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="inline-flex items-center space-x-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-md">
              <Briefcase className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Job Matcher
            </span>
          </div>

          <button
            onClick={() => auth.signinRedirect()}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-black mb-4 leading-tight">
            Find Your Perfect Job Match
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Upload your resume and get AI-powered job recommendations tailored to your skills
          </p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Available Positions</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            />
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 mb-6">
            Showing <span className="font-semibold text-indigo-600">{filteredJobs.length}</span> of{" "}
            <span className="font-semibold">{allJobs.length}</span> positions
          </p>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-indigo-300 transition">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600 font-semibold">{job.company}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {job.company.charAt(0)}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-600" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600" />
                      {job.salary}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4">{job.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => auth.signinRedirect()}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-md transition"
                  >
                    Sign In to Apply
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No jobs match your search.</p>
                <button
                  onClick={() => setSearchFilter("")}
                  className="text-indigo-600 hover:underline font-semibold mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-center text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
          <p className="text-lg mb-6">Upload your resume and get AI-powered job matches in seconds</p>
          <button
            onClick={() => auth.signinRedirect()}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p>&copy; 2025 Resume Job Matcher. All rights reserved.</p>
      </footer>
    </div>
  );
}
