import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-[#0A0B0F]">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B0F] via-[#12131A] to-[#0A0B0F]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(100, 204, 197, 0.15), transparent 50%)',
            backgroundSize: '100% 100%'
          }} />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-normal mb-8"
            >
              Bring your ideas to life with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-400 mb-12 max-w-2xl"
            >
              Explore our latest AI breakthroughs in research and technology, from foundational models to real-world applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/showcase">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#64CCC5] text-black font-medium rounded-lg hover:bg-[#176B87] transition-colors flex items-center gap-2"
                >
                  View Projects <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>

              <Link to="/papers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#1F2937]/50 text-white font-medium rounded-lg border border-[#2A2F42] hover:border-[#64CCC5]/30 transition-colors"
                >
                  Research Papers
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="max-w-7xl mx-auto px-4 pb-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Research",
                description: "Explore our latest breakthroughs in AI research and development.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
                link: "/research"
              },
              {
                title: "Technologies",
                description: "Discover our cutting-edge AI technologies and their applications.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
                link: "/technologies"
              },
              {
                title: "Papers",
                description: "Read our published research papers and technical documentation.",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000",
                link: "/papers"
              }
            ].map((item, index) => (
              <Link key={item.title} to={item.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="group relative h-[400px] overflow-hidden rounded-2xl"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                      <h2 className="text-2xl font-normal mb-4">{item.title}</h2>
                      <p className="text-gray-300 mb-6">{item.description}</p>
                      <div className="flex items-center gap-2 text-[#64CCC5] font-medium">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-[#12131A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-normal mb-6">Stay updated with our latest research</h2>
            <p className="text-gray-400 mb-8">Sign up for our newsletter to receive updates about our latest breakthroughs and publications.</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#1F2937] border border-[#2A2F42] rounded-lg focus:outline-none focus:border-[#64CCC5]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#64CCC5] text-black font-medium rounded-lg hover:bg-[#176B87] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;