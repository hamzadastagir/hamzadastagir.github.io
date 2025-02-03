import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Layers, FileText, Home, Briefcase, Info, GraduationCap, BookOpen, BookOpenCheck } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    {
      label: 'About',
      icon: Info,
      submenu: [
        { path: '/about', label: 'Overview', icon: Info },
        { path: '/work', label: 'Work Experience', icon: Briefcase },
        { path: '/education', label: 'Education', icon: GraduationCap },
      ]
    },
    { path: '/showcase', label: 'Projects', icon: Layers },
    {
      label: 'Papers & Research',
      icon: BookOpen,
      submenu: [
        { path: '/papers', label: 'All Papers', icon: FileText },
        { path: '/papers/tutorial', label: 'How to Add Papers', icon: BookOpenCheck },
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0B0F]/80 backdrop-blur-md border-b border-[#1F2937]/20">
      <nav className="container mx-auto px-4 h-[70px] flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Layers className="h-8 w-8 text-[#64CCC5]" aria-hidden="true" />
            <span className="ml-2 text-lg font-bold gradient-text">Hamza</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.submenu ? (
                <div className="relative group">
                  <button className="text-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5">
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-[#0A0B0F] border border-[#1F2937]/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location.pathname === subitem.path
                            ? 'text-[#64CCC5] bg-[#64CCC5]/10'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <subitem.icon className="h-4 w-4" aria-hidden="true" />
                          {subitem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`text-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                    ${location.pathname === item.path 
                      ? 'text-[#64CCC5] bg-[#64CCC5]/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="mailto:hamza.dastagir@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button"
          >
            Contact
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-[#0A0B0F]/95 backdrop-blur-lg border-b border-[#1F2937]/20"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.submenu ? (
                <>
                  <div className="text-sm text-gray-400 px-4 py-2">{item.label}</div>
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className={`flex items-center gap-2 px-8 py-2 text-sm transition-colors ${
                        location.pathname === subitem.path
                          ? 'text-[#64CCC5] bg-[#64CCC5]/10'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <subitem.icon className="h-4 w-4" aria-hidden="true" />
                      {subitem.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'text-[#64CCC5] bg-[#64CCC5]/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
          
          <motion.a
            href="mailto:hamza.dastagir@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button mt-4 justify-center"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </motion.a>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;