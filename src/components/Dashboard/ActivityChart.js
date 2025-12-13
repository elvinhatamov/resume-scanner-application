import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ActivityChart = ({ data }) => {
  // Sample data if none provided
  const chartData = data || [
    { date: 'Jan 1', scans: 4 },
    { date: 'Jan 5', scans: 8 },
    { date: 'Jan 10', scans: 12 },
    { date: 'Jan 15', scans: 7 },
    { date: 'Jan 20', scans: 15 },
    { date: 'Jan 25', scans: 20 },
    { date: 'Jan 30', scans: 18 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{payload[0].payload.date}</p>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold">
            {payload[0].value} scans
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Scanning Activity (Last 30 Days)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            className="text-xs"
          />
          <YAxis 
            stroke="#6b7280"
            className="text-xs"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="scans" 
            stroke="url(#colorGradient)" 
            strokeWidth={3}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ActivityChart;
