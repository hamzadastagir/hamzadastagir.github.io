import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadMarkdown } from '../utils/markdown';

const Work = () => {
  const [content, setContent] = useState<{ attributes: any; body: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await loadMarkdown('src/content/work.md');
        setContent(result);
      } catch (err) {
        console.error('Error loading work content:', err);
        setError('Failed to load content');
      }
    };
    fetchContent();
  }, []);

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0B0F17]"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-medium mb-4 gradient-text">
            {content.attributes.title || 'Professional Experience'}
          </h1>
          <p className="text-lg text-gray-400">
            {content.attributes.subtitle || 'A journey through technology and innovation'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MarkdownRenderer content={content.body} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;