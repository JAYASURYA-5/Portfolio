import { motion } from 'framer-motion';
import { Code, Database, BarChart3, FileSpreadsheet, Brain, TrendingUp } from 'lucide-react';

const skills = [
  {
    name: "Python",
    level: 90,
    icon: Code,
    description: "Data manipulation, ML libraries (Pandas, Scikit-learn, NumPy)"
  },
  {
    name: "Power BI",
    level: 85,
    icon: BarChart3,
    description: "Interactive dashboards, DAX formulas, data modeling"
  },
  {
    name: "SQL",
    level: 80,
    icon: Database,
    description: "Complex queries, database optimization, data extraction"
  },
  {
    name: "Excel",
    level: 88,
    icon: FileSpreadsheet,
    description: "Advanced formulas, pivot tables, data analysis"
  },
  {
    name: "Data Analysis",
    level: 92,
    icon: TrendingUp,
    description: "Statistical analysis, data cleaning, insight generation"
  },
  {
    name: "Data Science",
    level: 90,
    icon: Brain,
    description: "Machine learning, predictive modeling, data visualization"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for transforming data into actionable insights
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-cyber transition-all duration-300 hover:border-primary/30">
                {/* Icon and Title */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                    <skill.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6">
                  {skill.description}
                </p>

                {/* Skill Level */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Proficiency</span>
                    <span className="text-sm text-primary font-bold">{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
            Additional Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn',
              'Jupyter', 'Google Colab', 'Git', 'Statistics', 'Machine Learning'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-muted/20 backdrop-blur-sm border border-border/30 rounded-full text-sm hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
