import { motion } from 'framer-motion';
import { Github, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import ProjectModal, { ProjectFormData } from '@/components/ProjectModal';

interface Project extends ProjectFormData {
  id: string;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: "Image to Excel Converter",
    description: "Advanced computer vision solution that converts unstructured image tables into structured Excel data using OCR and data processing algorithms.",
    technologies: "Python, OpenCV, Pandas, OCR, Excel",
    features: "Automated table detection in images\nOCR text extraction and processing\nData validation and cleaning\nExcel export with formatting",
    type: "Python",
    githubLink: "https://github.com",
    livePageUrl: ""
  },
  {
    id: '2',
    title: "Loan Prediction System",
    description: "Machine learning model that predicts loan approval probability based on demographic and financial data, helping financial institutions make informed decisions.",
    technologies: "Python, Scikit-learn, Pandas, ML, Statistics",
    features: "Multiple ML algorithms comparison\nFeature engineering and selection\nModel evaluation and validation\nRisk assessment metrics",
    type: "Data Science",
    githubLink: "https://github.com",
    livePageUrl: ""
  },
  {
    id: '3',
    title: "Food Delivery Time Analysis",
    description: "Comprehensive analysis of delivery efficiency factors including weather patterns, traffic conditions, and demographic influences using Power BI and Python.",
    technologies: "Python, Power BI, DAX, Statistics, Visualization",
    features: "Weather impact analysis\nTraffic pattern correlation\nInteractive Power BI dashboard\nDelivery optimization insights",
    type: "Data Analyst",
    githubLink: "https://github.com",
    livePageUrl: ""
  }
];

const projectTypes = ['Full Stack', 'Data Science', 'Data Analyst', 'Python'] as const;

export default function Projects() {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToast();

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Filter out Hotel Booking System project
        const filtered = parsed.filter((p: Project) => p.title !== 'Hotel Booking System');
        setProjects(filtered);
        // Update localStorage with filtered projects
        if (filtered.length !== parsed.length) {
          localStorage.setItem('portfolioProjects', JSON.stringify(filtered));
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (updatedProjects: Project[]) => {
    try {
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Failed to save projects:', error);
      toast({
        title: "Save failed",
        description: "Could not save projects to storage.",
        variant: "destructive",
      });
    }
  };

  // Get the project being edited
  const editingProject = editingProjectId 
    ? projects.find((p) => p.id === editingProjectId) 
    : undefined;

  // Filter projects based on selected type
  const filteredProjects = selectedType
    ? projects.filter((p) => p.type === selectedType)
    : projects;

  // Add new project
  const handleAddProject = (data: ProjectFormData) => {
    const newProject: Project = {
      ...data,
      id: Date.now().toString(),
    };
    saveProjects([...projects, newProject]);
  };

  // Update existing project
  const handleUpdateProject = (data: ProjectFormData) => {
    if (!editingProjectId) return;
    
    const updatedProjects = projects.map((p) =>
      p.id === editingProjectId ? { ...p, ...data, id: editingProjectId } : p
    );
    saveProjects(updatedProjects);
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      saveProjects(updatedProjects);
      toast({
        title: "Project deleted",
        description: "Project has been removed successfully.",
      });
    }
  };

  // Save project (add or update)
  const handleSaveProject = async (data: ProjectFormData) => {
    setIsSaving(true);
    if (editingProjectId) {
      handleUpdateProject(data);
      toast({
        title: "Project updated",
        description: `${data.title} has been updated successfully.`,
      });
    } else {
      handleAddProject(data);
      toast({
        title: "Project added",
        description: `${data.title} has been added successfully.`,
      });
    }
    closeModal();
    setTimeout(() => setIsSaving(false), 1000);
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingProjectId(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (project: Project) => {
    setEditingProjectId(project.id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProjectId(null);
  };

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

        {/* Filter Buttons and Add Project */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Button
              onClick={() => setSelectedType(null)}
              variant={selectedType === null ? "default" : "outline"}
              className={`transition-all duration-300 ${
                selectedType === null
                  ? "bg-gradient-primary hover:shadow-glow"
                  : "border-border/50 hover:border-primary/50"
              }`}
            >
              All Projects
            </Button>

            {projectTypes.map((type) => (
              <Button
                key={type}
                onClick={() => setSelectedType(type)}
                variant={selectedType === type ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  selectedType === type
                    ? "bg-gradient-primary hover:shadow-glow"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Add Project Button */}
          {isAuthenticated && (
            <div className="flex justify-center">
              <Button
                onClick={openAddModal}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Project
              </Button>
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
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
                          <CardTitle className="text-xl lg:text-2xl">
                            {project.title}
                          </CardTitle>
                          <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                            {project.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                      {project.livePageUrl && (
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.livePageUrl, '_blank');
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          className="ml-4 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 flex-shrink-0 text-foreground/60 hover:text-green-600 pointer-events-auto z-20 relative"
                          title="View Live Page"
                          style={{ cursor: 'pointer' }}
                        >
                          <ExternalLink size={24} />
                        </motion.button>
                      )}
                      {project.githubLink && (
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.githubLink, '_blank');
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          className="ml-4 p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-all duration-300 flex-shrink-0 text-foreground/60 hover:text-primary pointer-events-auto z-20 relative"
                          title="View on GitHub"
                          style={{ cursor: 'pointer' }}
                        >
                          <Github size={24} className="group-hover:animate-pulse" />
                        </motion.button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech) => (
                          <span
                            key={tech.trim()}
                            className="px-3 py-1 bg-muted/20 rounded-md text-sm border border-border/30 hover:border-primary/50 transition-colors"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">
                        Key Features
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {project.features.split('\n').map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border/30 relative z-20">
                      {project.livePageUrl && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="group hover:border-green-500/50 hover:bg-green-500/10 pointer-events-auto"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.livePageUrl, '_blank');
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4 group-hover:text-green-600" />
                          Live Page
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="group hover:border-primary/50 hover:bg-primary/10 pointer-events-auto"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.githubLink, '_blank');
                          }}
                        >
                          <Github className="mr-2 h-4 w-4 group-hover:text-primary" />
                          GitHub
                        </Button>
                      )}

                      {isAuthenticated && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="group hover:border-primary/50 hover:bg-primary/10 pointer-events-auto"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openEditModal(project);
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4 group-hover:text-primary" />
                            Edit
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="group hover:border-red-500/50 hover:bg-red-500/10 pointer-events-auto"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteProject(project.id);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4 group-hover:text-red-500" />
                            Delete
                          </Button>
                        </>
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
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No projects found for this category. Try selecting a different category or add a new project!
              </p>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        {filteredProjects.length > 0 && (
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
              <a
                href="https://github.com/JAYASURYA-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveProject}
        initialData={editingProject}
      />
    </section>
  );
}