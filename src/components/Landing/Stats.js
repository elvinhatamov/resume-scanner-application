import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Briefcase,
      value: '50,000+',
      label: 'Job Listings',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      value: '8.5/10',
      label: 'User Satisfaction',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our growing community of successful job seekers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center overflow-hidden group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4`}>
                <stat.icon size={28} />
              </div>

              {/* Value */}
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-2xl p-8 lg:p-12 text-center text-white"
        >
          <p className="text-2xl font-bold mb-4">
            "This platform changed my job search completely. I found my dream job in just 2 weeks!"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">
              JS
            </div>
            <div className="text-left">
              <div className="font-semibold">John Smith</div>
              <div className="text-indigo-200 text-sm">Software Engineer at Google</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
