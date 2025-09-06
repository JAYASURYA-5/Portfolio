
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const education = {
  degree: "B.Tech in Information Technology",
  institution: "Adithya Institute of Technology",
  location: "Coimbatore",
  duration: "2023 - 2027",
  description: "Focused on data structures, algorithms, database management, and emerging technologies in IT."
};
const stats = [{
  label: "Projects Completed",
  value: "3+"
}, {
  label: "Technologies",
  value: "6+"
}, {
  label: "Years of Learning",
  value: "2+"
}];
export default function About() {
  return <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about transforming complex data into meaningful insights 
            that drive business decisions and innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Bio */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h3 className="text-2xl font-bold mb-6 text-primary">My Journey</h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I am a <span className="text-primary font-semibold">Data Science, Data Analysis, and Python Developer </span> 
                currently pursuing my B.Tech in Information Technology. My passion lies in uncovering 
                patterns and insights from complex datasets.
              </p>
              <p>
                With expertise in Python, Power BI, SQL, and Excel, I specialize in creating 
                comprehensive data solutions that bridge the gap between raw information and 
                actionable business intelligence.
              </p>
              <p>
                My approach combines statistical analysis with modern visualization techniques 
                to deliver clear, impactful results that drive strategic decision-making.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => <motion.div key={stat.label} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-dark overflow-hidden group hover:shadow-cyber transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">Education</h3>
                    <h4 className="text-lg font-semibold mb-3">{education.degree}</h4>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-medium">{education.institution}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{education.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{education.duration}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground">{education.description}</p>
                </div>

                {/* Timeline Indicator */}
                <div className="relative mt-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-primary rounded-full"></div>
                  <div className="pl-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-primary rounded-full -ml-7 relative z-10 border-2 border-background"></div>
                      <span className="text-sm font-medium text-primary">Current</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Focused on Data Science, Data Analysis, and Python Development
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>;
}
