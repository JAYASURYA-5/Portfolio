import { motion } from 'framer-motion';
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

const socialLinks = [{
  icon: Github,
  href: 'https://github.com/JAYASURYA-5',
  label: 'GitHub'
}, {
  icon: Linkedin,
  href: 'https://www.linkedin.com/in/jayasurya-k-248937305/',
  label: 'LinkedIn'
}, {
  icon: Mail,
  href: '#contact',
  label: 'Email'
}];

export default function Hero() {
  const [profileImage, setProfileImage] = useState('/portfolio-uploads/43a2fc1e-0413-446a-8d0d-a673f73ac446.png');

  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="text-center lg:text-left">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="mb-4">
              <span className="text-primary text-lg font-medium">Hello, I'm</span>
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Jayasurya
              </span>
            </motion.h1>

            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="text-2xl lg:text-3xl text-muted-foreground mb-8">Data Analysis &amp; Data Science </motion.h2>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.8
          }} className="text-lg text-muted-foreground mb-8 max-w-xl">
              Transforming raw data into actionable insights through advanced analytics, 
              machine learning, and interactive visualizations.
            </motion.p>

            {/* Action Buttons */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1
          }} className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group">
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="#projects">
                  View Projects
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.2
          }} className="flex justify-center lg:justify-start space-x-6">
              {socialLinks.map((social, index) => <motion.a 
                key={social.label} 
                href={social.href} 
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300" 
                whileHover={{
                  scale: 1.1,
                  y: -2
                }} 
                whileTap={{
                  scale: 0.95
                }} 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                animate={{
                  opacity: 1,
                  y: 0
                }} 
                transition={{
                  delay: 1.4 + index * 0.1
                }}>
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>)}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="flex justify-center lg:justify-end">
            <motion.div className="relative" animate={{
            y: [0, -20, 0]
          }} transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              
              {/* Profile Picture */}
              <ImageUpload
                currentImage={profileImage}
                onImageChange={setProfileImage}
                className="relative z-10"
              />

              {/* Floating Elements */}
              <motion.div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full opacity-80" animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
              <motion.div className="absolute -bottom-6 -left-6 w-8 h-8 bg-accent rounded-full opacity-60" animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360]
            }} transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 2
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>;
}
