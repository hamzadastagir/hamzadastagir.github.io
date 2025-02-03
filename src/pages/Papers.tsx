import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, FileText, BarChart as ChartBar, Shield, Network } from 'lucide-react';

const papers = [
  {
    title: "Labour Market of Pakistan",
    date: "2020-06-15",
    author: "Hamza Dastagir",
    excerpt: "A comprehensive analysis of Pakistan's labor market dynamics, employment trends, and economic indicators.",
    category: "Economics",
    path: "/papers/labour-market-pakistan",
    icon: ChartBar
  },
  {
    title: "Understanding LCOE of Renewables",
    date: "2020-08-20",
    author: "Hamza Dastagir",
    excerpt: "Detailed study on Levelized Cost of Energy (LCOE) for renewable energy sources and their economic viability.",
    category: "Energy",
    path: "/papers/lcoe-renewables",
    icon: FileText
  },
  {
    title: "Strategic Policy in International Relations",
    date: "2021-05-15",
    author: "Hamza Dastagir",
    excerpt: "Analysis of strategic decision-making frameworks in complex geopolitical scenarios.",
    category: "Policy",
    path: "/papers/strategic-policy",
    icon: Shield
  },
  {
    title: "Graph Data Visualization",
    date: "2024-03-15",
    author: "Hamza Dastagir",
    excerpt: "Advanced techniques in graph visualization for complex network analysis.",
    category: "Data Science",
    path: "/papers/graph-visualization",
    icon: Network
  }
];

const Papers = () => {
  const categories = Array.from(new Set(papers.map(paper => paper.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPapers = selectedCategory 
    ? papers.filter(paper => paper.category === selectedCategory)
    : papers;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-black"
    >
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-medium gradient-text mb-4">Research Papers</h1>
          <p className="text-gray-400 text-sm">
            Academic research and analysis in economics, technology, and policy
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-2 py-1 text-xs rounded-sm transition-colors
                ${!selectedCategory 
                  ? 'text-[#64CCC5]' 
                  : 'text-gray-400 hover:text-gray-300'}`}
            >
              All Papers
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 py-1 text-xs rounded-sm transition-colors
                  ${selectedCategory === category 
                    ? 'text-[#64CCC5]' 
                    : 'text-gray-400 hover:text-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {filteredPapers.map((paper, index) => (
            <Link key={paper.title} to={paper.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-transparent hover:bg-gray-900/20 p-4 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2">
                    <paper.icon className="h-5 w-5 text-[#64CCC5]" />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-lg font-medium mb-2 group-hover:text-[#64CCC5] transition-colors">
                      {paper.title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {paper.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(paper.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {paper.author}
                      </div>
                      <span className="text-[#64CCC5]/70">{paper.category}</span>
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-[#64CCC5] 
                                       transform group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Papers;