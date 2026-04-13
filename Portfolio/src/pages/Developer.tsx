import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Achievement from '@/components/sections/Achievement';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';

const Developer = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Achievement />
        <Projects />
        <Services />
        <Contact />
      </main>
    </div>
  );
};

export default Developer;
