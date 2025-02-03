import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, DollarSign, TrendingUp, Activity, AlertTriangle, Shield, Eye } from 'lucide-react';
import { dashboardData } from '../data/mockData';

const Dashboard = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const riskChartRef = useRef<HTMLDivElement>(null);
  const sanctionsChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    script.async = true;
    script.onload = initializeCharts;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeCharts = () => {
    if (chartRef.current && window.Plotly) {
      // 3D Scatter plot for transaction patterns
      const data = [{
        type: 'scatter3d',
        mode: 'markers',
        x: Array.from({ length: 100 }, () => Math.random() * 100),
        y: Array.from({ length: 100 }, () => Math.random() * 100),
        z: Array.from({ length: 100 }, () => Math.random() * 100),
        marker: {
          size: 6,
          color: Array.from({ length: 100 }, () => Math.random()),
          colorscale: 'Viridis',
          opacity: 0.8
        }
      }];

      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        scene: {
          xaxis: { gridcolor: '#1F2937', title: 'Transaction Volume' },
          yaxis: { gridcolor: '#1F2937', title: 'Time (hours)' },
          zaxis: { gridcolor: '#1F2937', title: 'Risk Score' }
        },
        margin: { l: 0, r: 0, t: 0, b: 0 }
      };

      window.Plotly.newPlot(chartRef.current, data, layout);
    }

    if (riskChartRef.current && window.Plotly) {
      // Risk distribution chart
      const data = [{
        values: [
          dashboardData.riskMetrics.highRiskTransactions,
          dashboardData.riskMetrics.mediumRiskTransactions,
          dashboardData.riskMetrics.lowRiskTransactions
        ],
        labels: ['High Risk', 'Medium Risk', 'Low Risk'],
        type: 'pie',
        hole: 0.6,
        marker: {
          colors: ['#ef4444', '#f59e0b', '#81C200']
        },
        textinfo: 'label+percent',
        textposition: 'outside'
      }];

      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        margin: { l: 20, r: 20, t: 20, b: 20 },
        annotations: [{
          font: { size: 20, color: '#d1d4dc' },
          showarrow: false,
          text: 'Risk<br>Distribution',
          x: 0.5,
          y: 0.5
        }]
      };

      window.Plotly.newPlot(riskChartRef.current, data, layout);
    }

    if (sanctionsChartRef.current && window.Plotly) {
      // Sanctions screening results
      const data = [{
        type: 'bar',
        x: dashboardData.sanctionsData.byRegion.map(d => d.region),
        y: dashboardData.sanctionsData.byRegion.map(d => d.count),
        marker: {
          color: '#81C200'
        }
      }];

      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#d1d4dc' },
        xaxis: {
          gridcolor: '#1F2937',
          tickangle: -45
        },
        yaxis: {
          gridcolor: '#1F2937',
          title: 'Number of Matches'
        },
        margin: { l: 50, r: 20, t: 20, b: 100 }
      };

      window.Plotly.newPlot(sanctionsChartRef.current, data, layout);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Total Users', value: dashboardData.metrics.totalUsers.toLocaleString(), color: 'blue' },
          { icon: Activity, label: 'Active Users', value: dashboardData.metrics.activeUsers.toLocaleString(), color: 'green' },
          { icon: TrendingUp, label: 'Conversion Rate', value: dashboardData.metrics.conversionRate, color: 'purple' },
          { icon: DollarSign, label: 'Revenue', value: dashboardData.metrics.revenue, color: 'yellow' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-4">
              <metric.icon className={`h-8 w-8 text-${metric.color}-500`} />
              <div>
                <p className="text-sm text-gray-400">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Transaction Patterns</h3>
          <div ref={chartRef} className="h-[400px] w-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Risk Analysis</h3>
          <div ref={riskChartRef} className="h-[400px] w-full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Sanctions Screening</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-400">
                {dashboardData.sanctionsData.totalScreened.toLocaleString()} Total Screened
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-400">
                {dashboardData.sanctionsData.matches.toLocaleString()} Matches
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-400">
                {dashboardData.sanctionsData.pendingReview.toLocaleString()} Pending Review
              </span>
            </div>
          </div>
        </div>
        <div ref={sanctionsChartRef} className="h-[400px] w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400">User</th>
                <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-gray-400">Risk Level</th>
                <th className="text-left py-3 px-4 text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{transaction.user}</td>
                  <td className="py-3 px-4">${transaction.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      transaction.status === 'completed' 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-yellow-900/50 text-yellow-300'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      Math.random() > 0.5 
                        ? 'bg-red-900/50 text-red-300' 
                        : 'bg-green-900/50 text-green-300'
                    }`}>
                      {Math.random() > 0.5 ? 'High' : 'Low'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;