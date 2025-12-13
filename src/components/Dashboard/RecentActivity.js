import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, RefreshCw, Trash2 } from 'lucide-react';

const RecentActivity = ({ activities }) => {
  // Sample data if none provided
  const sampleActivities = activities || [
    {
      id: 1,
      name: 'John_Doe_Resume.pdf',
      date: '2024-01-15',
      time: '10:30 AM',
      score: 87,
      status: 'completed'
    },
    {
      id: 2,
      name: 'Jane_Smith_CV.pdf',
      date: '2024-01-14',
      time: '3:45 PM',
      score: 92,
      status: 'completed'
    },
    {
      id: 3,
      name: 'Mike_Johnson.docx',
      date: '2024-01-13',
      time: '11:20 AM',
      score: 75,
      status: 'completed'
    },
    {
      id: 4,
      name: 'Sarah_Williams.pdf',
      date: '2024-01-12',
      time: '2:15 PM',
      score: 95,
      status: 'completed'
    },
    {
      id: 5,
      name: 'David_Brown.pdf',
      date: '2024-01-11',
      time: '9:00 AM',
      score: 68,
      status: 'completed'
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Resume
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Score
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleActivities.map((activity, index) => (
              <motion.tr
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="text-indigo-600 dark:text-indigo-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.date}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(activity.score)}`}>
                    {activity.score}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="text-gray-600 dark:text-gray-400" size={18} />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Re-scan"
                    >
                      <RefreshCw className="text-gray-600 dark:text-gray-400" size={18} />
                    </button>
                    <button 
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="text-red-600 dark:text-red-400" size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentActivity;
