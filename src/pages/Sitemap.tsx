import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Briefcase, FileText, Info, BookOpen, ChevronRight } from 'lucide-react';

const Sitemap = () => {
  const sections = [
    {
      title: 'Main Navigation',
      icon: Home,
      links: [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/sitemap', label: 'Sitemap' }
      ]
    },
    {
      title: 'Projects',
      icon: Briefcase,
      links: [
        { path: '/showcase', label: 'Project Showcase' },
        { path: '/showcase/dashboard', label: 'Analytics Dashboard' },
        { path: '/showcase/graph-analysis', label: 'Graph Analysis' }
      ]
    },
    {
      title: 'Research Papers',
      icon: FileText,
      links: [
        { path: '/papers', label: 'Papers Overview' },
        { path: '/papers/labour-market-pakistan', label: 'Labour Market Analysis' },
        { path: '/papers/lcoe-renewables', label: 'LCOE of Renewables' }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Sitemap</h1>
          <p className="text-gray-400">
            A complete overview of all pages and resources available on this site.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="h-6 w-6 text-[#64CCC5]" />
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              
              <div className="grid gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-3 text-gray-400 hover:text-white p-4 rounded-lg
                             transition-all duration-300 hover:bg-white/5"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sitemap;