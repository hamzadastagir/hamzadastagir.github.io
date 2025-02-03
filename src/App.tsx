import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Education from './pages/Education';
import Sitemap from './pages/Sitemap';
import Resume from './pages/Resume';
import Showcase from './pages/Showcase';
import Papers from './pages/Papers';
import PaperTutorial from './pages/PaperTutorial';
import Dashboard from './pages/showcase/Dashboard';
import GraphAnalysis from './pages/showcase/GraphAnalysis';
import PaperTemplate from './components/PaperTemplate';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-[#0A0B0F] flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/education" element={<Education />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/papers/tutorial" element={<PaperTutorial />} />
                <Route path="/showcase/dashboard" element={<Dashboard />} />
                <Route path="/showcase/graph-analysis" element={<GraphAnalysis />} />
                
                {/* Paper Routes */}
                <Route 
                  path="/papers/labour-market-pakistan" 
                  element={<PaperTemplate paperPath="/src/content/papers/labour-market.md" />} 
                />
                <Route 
                  path="/papers/lcoe-renewables" 
                  element={<PaperTemplate paperPath="/src/content/papers/lcoe-renewables.md" />} 
                />
                <Route 
                  path="/papers/strategic-policy" 
                  element={<PaperTemplate paperPath="/src/content/papers/strategic-policy.md" />} 
                />
                <Route 
                  path="/papers/defense-econ" 
                  element={<PaperTemplate paperPath="/src/content/papers/defense-econ.md" />} 
                />
                <Route 
                  path="/papers/info-systems" 
                  element={<PaperTemplate paperPath="/src/content/papers/info-systems.md" />} 
                />
                <Route 
                  path="/papers/graph-visualization" 
                  element={<PaperTemplate paperPath="/src/content/papers/graph-visualization.md" />} 
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;