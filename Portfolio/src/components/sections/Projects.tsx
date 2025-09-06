import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const projects = [
  {
    title: "Image to Excel Converter",
    description: "Advanced computer vision solution that converts unstructured image tables into structured Excel data using OCR and data processing algorithms.",
    technologies: ["Python", "OpenCV", "Pandas", "OCR", "Excel"],
    features: [
      "Automated table detection in images",
      "OCR text extraction and processing",
      "Data validation and cleaning",
      "Excel export with formatting"
    ],
    links: {
      github: "#"
    },
    category: "Computer Vision"
  },
  {
    title: "Loan Prediction System",
    description: "Machine learning model that predicts loan approval probability based on demographic and financial data, helping financial institutions make informed decisions.",
    technologies: ["Python", "Scikit-learn", "Pandas", "ML", "Statistics"],
    features: [
      "Multiple ML algorithms comparison",
      "Feature engineering and selection",
      "Model evaluation and validation",
      "Risk assessment metrics"
    ],
    links: {
      github: "#"
    },
    category: "Machine Learning"
  },
  {
    title: "Food Delivery Time Analysis",
    description: "Comprehensive analysis of delivery efficiency factors including weather patterns, traffic conditions, and demographic influences using Power BI and Python.",
    technologies: ["Python", "Power BI", "DAX", "Statistics", "Visualization"],
    features: [
      "Weather impact analysis",
      "Traffic pattern correlation",
      "Interactive Power BI dashboard",
      "Delivery optimization insights"
    ],
    links: {
      github: "#",
      powerbi: "#"
    },
    category: "Data Analysis"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world applications showcasing data science and analysis expertise
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-dark hover:shadow-cyber transition-all duration-300 group overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-xl lg:text-2xl">{project.title}</CardTitle>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted/20 rounded-md text-sm border border-border/30 hover:border-primary/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Features</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30">
                    {project.links.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="group hover:border-primary/50 hover:bg-primary/10"
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4 group-hover:text-primary" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    
                    
                    {project.links.powerbi && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="group hover:border-primary/50 hover:bg-primary/10"
                        asChild
                      >
                        <a href={project.links.powerbi} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4 group-hover:text-primary" />
                          Power BI Dashboard
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  initial={false}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Interested in seeing more of my work?
          </p>
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            asChild
          >
            <a href="https://github.com/dashboard" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}