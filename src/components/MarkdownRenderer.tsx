import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  components?: Record<string, React.ComponentType<any>>;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '', components = {} }) => {
  // Pre-process content to handle chart tags and SVG includes
  const processedContent = content.replace(
    /<(chart|svg)[\s\S]*?\/>/g,
    (match) => {
      try {
        if (match.startsWith('<svg')) {
          const nameMatch = match.match(/name="([^"]+)"/);
          if (!nameMatch) return match;
          return `<SvgComponent name="${nameMatch[1]}" />`;
        }

        // Extract chart attributes
        const typeMatch = match.match(/type="([^"]+)"/);
        const dataMatch = match.match(/data="([^"]+)"/);
        
        if (!typeMatch || !dataMatch) {
          console.warn('Missing required chart attributes:', match);
          return match;
        }

        const type = typeMatch[1];
        const data = dataMatch[1];

        // Extract config object
        const configMatch = match.match(/config={{([\s\S]*?)}}/);
        if (!configMatch) {
          console.warn('Missing config object:', match);
          return match;
        }

        // Clean and parse the config object
        const configStr = configMatch[1]
          .replace(/(\w+):/g, '"$1":')
          .replace(/'/g, '"')
          .replace(/,(\s*[}\]])/g, '$1')
          .trim();

        try {
          const config = JSON.parse(`{${configStr}}`);
          return `<ChartComponent type="${type}" data="${data}" config={${JSON.stringify(config)}} />`;
        } catch (error) {
          console.error('Error parsing chart config:', error);
          return `<div class="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p class="text-red-400 text-sm">Error parsing chart config: ${error.message}</p>
          </div>`;
        }
      } catch (error) {
        console.error('Error processing tag:', error);
        return `<div class="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
          <p class="text-red-400 text-sm">Error processing tag: ${error.message}</p>
        </div>`;
      }
    }
  );

  return (
    <ReactMarkdown
      className={`prose prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-2xl font-normal mb-2 text-white" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-xl font-normal mt-8 mb-4 text-white" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-lg font-normal mt-6 mb-3 text-[#64CCC5]" />
        ),
        h4: ({ node, ...props }) => (
          <h4 {...props} className="text-base font-normal mt-4 mb-2 text-white" />
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="text-gray-300 leading-relaxed mb-4" />
        ),
        a: ({ node, href, ...props }) => (
          <a
            href={href}
            {...props}
            className="text-[#64CCC5] hover:text-[#176B87] transition-colors no-underline"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          />
        ),
        ul: ({ node, ordered, ...props }) => (
          <ul {...props} className="list-disc list-inside space-y-2 mb-4 text-gray-300 ml-4" />
        ),
        ol: ({ node, ordered, ...props }) => (
          <ol {...props} className="list-decimal list-inside space-y-2 mb-4 text-gray-300 ml-4" />
        ),
        li: ({ node, ordered, ...props }) => (
          <li {...props} className="text-gray-300 leading-relaxed" />
        ),
        strong: ({ node, ...props }) => (
          <strong {...props} className="font-normal text-[#64CCC5]" />
        ),
        em: ({ node, ...props }) => (
          <em {...props} className="text-gray-400 italic" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className="border-l border-[#64CCC5] pl-4 my-4 italic text-gray-400"
          />
        ),
        code: ({ node, inline, ...props }) => 
          inline ? (
            <code
              {...props}
              className="bg-[#1F2937] text-gray-300 px-1.5 py-0.5 rounded text-sm font-mono"
            />
          ) : (
            <code
              {...props}
              className="block bg-[#1F2937] p-4 rounded-lg overflow-x-auto text-sm font-mono"
            />
          ),
        pre: ({ node, ...props }) => (
          <pre {...props} className="bg-transparent my-4" />
        ),
        img: ({ node, ...props }) => (
          <img {...props} className="rounded-lg max-w-full h-auto my-6" />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table {...props} className="min-w-full" />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th {...props} className="bg-[#1F2937] text-white px-3 py-2 text-left font-normal" />
        ),
        td: ({ node, ...props }) => (
          <td {...props} className="border-b border-gray-800 px-3 py-2 text-gray-300" />
        ),
        ChartComponent: ({ type, data, config }) => {
          if (components.chart) {
            return components.chart({ type, data, config });
          }
          return null;
        },
        SvgComponent: ({ name }) => {
          if (components.svg) {
            return components.svg({ name });
          }
          return null;
        },
        ...components
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;