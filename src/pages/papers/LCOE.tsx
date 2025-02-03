import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { loadMarkdown } from '../../utils/markdown';

const LCOE = () => {
  const [content, setContent] = useState<{ attributes: any; body: string } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await loadMarkdown('/src/content/papers/lcoe-renewables.md');
        setContent(result);
      } catch (err) {
        console.error('Error loading LCOE content:', err);
      }
    };
    fetchContent();
  }, []);

  if (!content) {
    return (
      <div className="pt-20 min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <motion.a
            href="/papers/lcoe-renewables.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-button flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </motion.a>
        </div>

        <div className="space-y-8">
          <MarkdownRenderer content={content.body} />
        </div>
      </div>
    </motion.div>
  );
};

export default LCOE;