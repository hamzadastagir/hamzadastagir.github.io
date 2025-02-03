import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadMarkdown } from '../utils/markdown';

const Resume = () => {
  const [content, setContent] = useState<{ attributes: any; body: string } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await loadMarkdown('/src/content/resume.md');
      setContent(result);
    };
    fetchContent();
  }, []);

  if (!content) {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0F17] flex items-center justify-center">
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
      className="pt-20 min-h-screen bg-[#0B0F17]"
    >
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 gradient-text">{attributes.title}</h1>
          <p className="text-xl text-gray-400">{attributes.subtitle}</p>
        </div>

        {/* Content */}
        <div className="glass-card p-8">
          <MarkdownRenderer content={body} />
        </div>
      </div>
    </motion.div>
  );
}

export default Resume;