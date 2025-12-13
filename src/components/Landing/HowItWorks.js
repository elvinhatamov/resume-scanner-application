import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Star, Briefcase } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      step: '01',
      title: 'Upload Your Resume',
      description: 'Simply drag and drop your resume in PDF or DOCX format. Our AI will parse it in seconds',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Search,
      step: '02',
      title: 'AI Analysis',
      description: 'Our advanced algorithms analyze your skills, experience, and preferences to find the best matches',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Star,
      step: '03',
      title: 'Get Matches',
      description: 'Receive personalized job recommendations ranked by compatibility with detailed match scores',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Briefcase,
      step: '04',
      title: 'Apply & Track',
      description: 'Apply to jobs directly and track your applications all in one convenient dashboard',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get matched with your perfect job in 4 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 z-0" />
              )}

              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-xl flex items-center justify-center shadow-lg`}>
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mb-4 mt-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${step.color} text-white`}>
                    <step.icon size={32} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to find your dream job?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300"
          >
            Start Free Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
