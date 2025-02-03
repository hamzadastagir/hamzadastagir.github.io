import React from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../../components/Dashboard';

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        <Dashboard />
      </div>
    </motion.div>
  );
};

export default DashboardPage;