import React from 'react';

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, excerpt, image, category }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-6">
        <div className="text-sm text-blue-500 font-semibold mb-2">{category}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{date}</span>
          <button className="text-blue-500 hover:text-blue-700 font-medium">Read More →</button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;