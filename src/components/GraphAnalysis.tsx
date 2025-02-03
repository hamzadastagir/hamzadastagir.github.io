import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { graphData } from '../data/mockData';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

const GraphAnalysis = () => {
  const networkRef = useRef<HTMLDivElement>(null);
  const networkInstanceRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!networkRef.current) return;

    // Create nodes with visual properties
    const nodes = new DataSet(
      graphData.nodes.map(node => ({
        ...node,
        color: {
          background: node.risk === 'high' ? '#ef4444' : 
                     node.risk === 'medium' ? '#f59e0b' : '#81C200',
          border: '#2A2F42',
          highlight: {
            background: '#81C200',
            border: '#2A2F42'
          }
        },
        font: {
          color: '#d1d4dc'
        },
        size: node.type === 'exchange' ? 30 : 20,
        shape: node.type === 'exchange' ? 'diamond' : 
               node.type === 'contract' ? 'hexagon' : 'dot'
      }))
    );

    // Create edges with visual properties
    const edges = new DataSet(
      graphData.edges.map(edge => ({
        ...edge,
        arrows: 'to',
        color: {
          color: '#2A2F42',
          highlight: '#81C200'
        },
        width: 2,
        label: edge.value,
        font: {
          color: '#d1d4dc',
          size: 10
        }
      }))
    );

    // Configure network options
    const options = {
      nodes: {
        borderWidth: 2,
        shadow: true
      },
      edges: {
        smooth: {
          type: 'continuous'
        }
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -30000,
          centralGravity: 0.3,
          springLength: 200,
          springConstant: 0.04
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200
      }
    };

    // Create network
    const network = new Network(
      networkRef.current,
      { nodes, edges },
      options
    );

    networkInstanceRef.current = network;

    // Add event listeners
    network.on('selectNode', (params) => {
      if (params.nodes.length) {
        const nodeId = params.nodes[0];
        const node = nodes.get(nodeId);
        console.log('Selected node:', node);
        // Here you could update a state to show node details in a sidebar
      }
    });

    network.on('selectEdge', (params) => {
      if (params.edges.length) {
        const edgeId = params.edges[0];
        const edge = edges.get(edgeId);
        console.log('Selected edge:', edge);
        // Here you could update a state to show transaction details
      }
    });

    return () => {
      if (networkInstanceRef.current) {
        networkInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-400">High Risk Entities</p>
              <p className="text-2xl font-bold">
                {graphData.nodes.filter(n => n.risk === 'high').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-400">Total Transactions</p>
              <p className="text-2xl font-bold">{graphData.edges.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
           <boltAction type="file" filePath="src/components/GraphAnalysis.tsx">          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-400">Active Entities</p>
              <p className="text-2xl font-bold">{graphData.nodes.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Network Analysis</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-400">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-400">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">Low Risk</span>
            </div>
          </div>
        </div>
        <div ref={networkRef} className="h-[600px] w-full border border-[#2A2F42] rounded-lg"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400">From</th>
                <th className="text-left py-3 px-4 text-gray-400">To</th>
                <th className="text-left py-3 px-4 text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-gray-400">Value</th>
                <th className="text-left py-3 px-4 text-gray-400">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {graphData.edges.map((edge, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="py-3 px-4">
                    {graphData.nodes.find(n => n.id === edge.from)?.label}
                  </td>
                  <td className="py-3 px-4">
                    {graphData.nodes.find(n => n.id === edge.to)?.label}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      edge.type === 'transaction' 
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-purple-900/50 text-purple-300'
                    }`}>
                      {edge.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{edge.value}</td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(edge.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default GraphAnalysis;