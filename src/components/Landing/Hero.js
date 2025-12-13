import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, CheckCircle } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-20 lg:py-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm text-green-400 px-4 py-2 rounded-full mb-8 text-sm font-medium border border-green-500/30"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            10,000+ Active Users
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="text-white">Your Career</span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Command Center
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            AI-powered job matching that analyzes your skills and connects you with perfect opportunities in real-time
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mb-16"
          >
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Upload size={24} />
              Upload Resume
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* Success Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-2xl shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-lg mb-1">Resume Analyzed Successfully</div>
                <div className="text-gray-400 text-sm">Your profile matches 23 opportunities</div>
              </div>
              <ArrowRight size={24} className="text-gray-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
