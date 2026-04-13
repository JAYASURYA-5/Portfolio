import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-card/80 backdrop-blur-glass border-b border-border shadow-cyber' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Jayasurya
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative text-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            {isAuthenticated ? (
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </motion.button>
            ) : (
              <Link to="/login">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={18} />
                  <span>Admin</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-border mt-4">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.a>
            ))}
            {isAuthenticated ? (
              <motion.button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </motion.button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <motion.button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={18} />
                  <span>Admin Login</span>
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}