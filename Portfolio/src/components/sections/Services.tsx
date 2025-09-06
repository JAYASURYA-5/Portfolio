import { motion } from 'framer-motion';
import { BarChart3, Brain, Database, TrendingUp, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: BarChart3,
    title: "Data Analysis for Business",
    description: "Transform your business data into actionable insights with comprehensive statistical analysis, trend identification, and performance metrics.",
    features: [
      "Business intelligence reporting",
      "KPI tracking and monitoring",
      "Trend analysis and forecasting",
      "Performance optimization insights"
    ],
    deliverables: "Interactive reports, executive dashboards, and strategic recommendations"
  },
  {
    icon: Brain,
    title: "Machine Learning Solutions",
    description: "Build predictive models and intelligent systems that automate decision-making and uncover hidden patterns in your data.",
    features: [
      "Predictive modeling and forecasting",
      "Classification and regression models",
      "Model evaluation and optimization",
      "Custom ML algorithm development"
    ],
    deliverables: "Trained models, documentation, and deployment guidelines"
  },
  {
    icon: Database,
    title: "Dashboard Development",
    description: "Create stunning, interactive dashboards using Power BI and Excel that provide real-time insights and enable data-driven decisions.",
    features: [
      "Power BI dashboard creation",
      "Interactive Excel workbooks",
      "Real-time data connections",
      "Custom visualizations and charts"
    ],
    deliverables: "Live dashboards, training materials, and maintenance support"
  }
];

const process = [
  {
    step: "01",
    title: "Data Discovery",
    description: "Understanding your data landscape and business objectives"
  },
  {
    step: "02",
    title: "Analysis & Modeling",
    description: "Applying advanced analytics and machine learning techniques"
  },
  {
    step: "03",
    title: "Visualization",
    description: "Creating compelling visuals and interactive dashboards"
  },
  {
    step: "04",
    title: "Delivery & Support",
    description: "Providing insights, recommendations, and ongoing support"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive data solutions to help your business make informed decisions
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-dark hover:shadow-cyber transition-all duration-300 group h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="p-4 bg-muted/10 rounded-lg border border-border/30">
                    <h5 className="font-medium text-primary mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Deliverables:
                    </h5>
                    <p className="text-sm text-muted-foreground">{service.deliverables}</p>
                  </div>
                </CardContent>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"
                  initial={false}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-6">
            My <span className="text-primary">Process</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to delivering high-quality data solutions
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:shadow-glow transition-all duration-300">
                  {step.step}
                </div>
                
                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -z-10" />
                )}
              </div>
              
              <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl"
        >
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Data?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help turn your data into a competitive advantage. 
            From analysis to implementation, I'll guide you through every step.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}