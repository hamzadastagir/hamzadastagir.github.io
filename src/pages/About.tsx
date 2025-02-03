import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadMarkdown } from '../utils/markdown';

const About = () => {
  const [content, setContent] = useState<{ attributes: any; body: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await loadMarkdown('src/content/about.md');
        setContent(result);
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Failed to load content');
      }
    };
    fetchContent();
  }, []);

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="pt-20 min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const { attributes, body } = content;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-40 h-40 md:w-48 md:h-48"
            >
              <div className="absolute inset-0 bg-[#64CCC5]/20 rounded-full blur-xl animate-pulse" />
              <img
                src={attributes.image}
                alt="Hamza Dastagir"
                className="relative w-full h-full object-cover rounded-full border-2 border-[#64CCC5]/20"
              />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-medium mb-3 gradient-text"
              >
                Hamza Dastagir
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-400 mb-4"
              >
                DevOps Engineer & Investigation Analyst
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center md:justify-start gap-4"
              >
                {[
                  { icon: Github, href: attributes.social?.github, label: 'GitHub' },
                  { icon: Linkedin, href: attributes.social?.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: `mailto:${attributes.social?.email}`, label: 'Email' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-[#64CCC5] transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
        >
          <Link 
            to="/work" 
            className="group p-6 bg-[#12131A]/50 hover:bg-[#12131A] border border-[#2A2F42] hover:border-[#64CCC5]/30 
                     rounded-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-[#64CCC5]" />
                <h2 className="text-lg font-medium">Work Experience</h2>
              </div>
              <ArrowRight className="h-5 w-5 text-[#64CCC5] transform group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="mt-2 text-sm text-gray-400">View my professional journey and achievements</p>
          </Link>

          <Link 
            to="/education" 
            className="group p-6 bg-[#12131A]/50 hover:bg-[#12131A] border border-[#2A2F42] hover:border-[#64CCC5]/30 
                     rounded-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[#64CCC5]" />
                <h2 className="text-lg font-medium">Education</h2>
              </div>
              <ArrowRight className="h-5 w-5 text-[#64CCC5] transform group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="mt-2 text-sm text-gray-400">Explore my academic background and certifications</p>
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="prose prose-invert max-w-none"
        >
          <MarkdownRenderer content={body} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;