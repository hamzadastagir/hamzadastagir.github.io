import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Showcase from './pages/Showcase';
import Dashboard from './pages/showcase/Dashboard';
import GraphAnalysis from './pages/showcase/GraphAnalysis';
import Blog from './pages/Blog';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route 
                path="/showcase/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/showcase/graph-analysis" 
                element={
                  <ProtectedRoute>
                    <GraphAnalysis />
                  </ProtectedRoute>
                } 
              />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;