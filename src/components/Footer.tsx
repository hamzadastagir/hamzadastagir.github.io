import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, FileText, Briefcase, Info, Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F1118] border-t border-[#2A2F42]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Hamza Dastagir</h3>
            <p className="text-gray-400">
              DevOps Engineer & Investigation Analyst specializing in risk analysis and cloud infrastructure.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2" role="list" aria-label="Primary navigation">
              <li><Link to="/" className="text-gray-400 hover:text-[#81C200] transition-colors">Home</Link></li>
              <li><Link to="/showcase" className="text-gray-400 hover:text-[#81C200] transition-colors">Projects</Link></li>
              <li><Link to="/papers" className="text-gray-400 hover:text-[#81C200] transition-colors">Papers</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#81C200] transition-colors">About</Link></li>
              <li><Link to="/sitemap" className="text-gray-400 hover:text-[#81C200] transition-colors">Sitemap</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2" role="list" aria-label="Services">
              <li className="text-gray-400">DevOps Engineering</li>
              <li className="text-gray-400">Risk Analysis</li>
              <li className="text-gray-400">Data Engineering</li>
              <li className="text-gray-400">Cloud Infrastructure</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/hamzadastagir" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-[#81C200] transition-colors"
                 aria-label="GitHub">
                <Github className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="https://linkedin.com/in/hamzadastagir" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-[#81C200] transition-colors"
                 aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="https://twitter.com/hamzadastagir" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-[#81C200] transition-colors"
                 aria-label="Twitter">
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="mailto:hamza.dastagir@gmail.com"
                 className="text-gray-400 hover:text-[#81C200] transition-colors"
                 aria-label="Email">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#2A2F42] text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Hamza Dastagir. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer