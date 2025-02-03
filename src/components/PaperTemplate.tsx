import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import MarkdownRenderer from './MarkdownRenderer';
import ChartRenderer from './charts/ChartRenderer';
import { loadPaperContent } from '../utils/papers';

interface PaperTemplateProps {
  paperPath: string;
}

const PaperTemplate: React.FC<PaperTemplateProps> = ({ paperPath }) => {
  const [content, setContent] = useState<{ attributes: any; body: string } | null>(null);
  const [paperData, setPaperData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const paperSlug = paperPath.split('/').pop()?.replace('.md', '');
        if (!paperSlug) {
          setError('Invalid paper path');
          return;
        }

        const { content, data } = await loadPaperContent(paperSlug);
        console.log('Loaded paper data:', { content, data }); // Debug log
        setContent(content);
        setPaperData(data);
      } catch (err) {
        console.error('Error loading paper content:', err);
        setError('Failed to load paper content');
      }
    };
    fetchContent();
  }, [paperPath]);

  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!content || !paperData) {
    return (
      <div className="pt-20 min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const { attributes, body } = content;
  const pageTitle = `${attributes.title || ''} | Research Papers`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={attributes.excerpt || ''} />
        <meta name="author" content={attributes.author || ''} />
        <meta name="category" content={attributes.category || ''} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 min-h-screen bg-[#0A0B0F]"
      >
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="text-sm text-[#64CCC5] mb-4">{attributes.category}</div>
            <h1 className="text-3xl font-normal mb-4">{attributes.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {attributes.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(attributes.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
              {attributes.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {attributes.author}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-sm prose-invert max-w-none">
            <MarkdownRenderer 
              content={body}
              components={{
                chart: ({ type, data: dataKey, config }) => {
                  console.log('Chart component:', { type, dataKey, config, availableData: paperData }); // Debug log
                  
                  if (!paperData || !paperData[dataKey]) {
                    console.warn(`No data found for key: ${dataKey}`);
                    return (
                      <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">No data available for chart: {dataKey}</p>
                      </div>
                    );
                  }

                  return (
                    <div className="glass-card p-6 my-8">
                      <ChartRenderer
                        type={type}
                        data={paperData[dataKey]}
                        config={config}
                      />
                    </div>
                  );
                }
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PaperTemplate;