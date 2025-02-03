import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Network, Globe, BarChart } from 'lucide-react';

const Showcase = () => {
  const projects = [
    {
      title: 'Risk Intelligence Platform',
      description: 'Advanced analytics dashboard for monitoring and detecting financial fraud patterns.',
      icon: Shield,
      path: '/showcase/dashboard',
      technologies: ['AWS', 'React', 'Python', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Market Analysis Tool',
      description: 'Real-time market data visualization and trend analysis platform.',
      icon: BarChart,
      path: '/showcase/graph-analysis',
      technologies: ['Neo4j', 'D3.js', 'Node.js', 'TradingView'],
      image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Sanctions Monitoring System',
      description: 'Automated system for tracking and analyzing global sanctions data.',
      icon: Globe,
      path: '/showcase/dashboard',
      technologies: ['Python', 'AWS Lambda', 'PostgreSQL', 'Docker'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Entity Graph Explorer',
      description: 'Interactive tool for exploring complex entity relationships and networks.',
      icon: Network,
      path: '/showcase/graph-analysis',
      technologies: ['Neo4j', 'React', 'TypeScript', 'D3.js'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B0F] via-[#161923] to-[#0A0B0F]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyMCA0ME00MCAwTDQwIDQwTTAgMEwwIDQwTTAgMjBMNDAgMjAiIHN0cm9rZT0iIzFBMUExQSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-400">
              Explore my latest work in risk analysis, data engineering, and cloud infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link key={project.title} to={project.path}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[400px] overflow-hidden rounded-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#64CCC5]/10 border border-[#64CCC5]/20">
                        <project.icon className="h-6 w-6 text-[#64CCC5]" />
                      </div>
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                    </div>

                    <p className="text-gray-300 mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm rounded-full
                                   text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[#64CCC5] font-medium">
                      View Project <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Showcase;