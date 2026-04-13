import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  type: 'internship' | 'fulltime' | 'freelance';
  logo?: string;
  certificateUrl?: string;
}

const defaultExperiences: Experience[] = [
  {
    id: '1',
    position: 'Data Science',
    company: 'Happieloop',
    location: 'Remote',
    startDate: 'Dec 2025',
    endDate: 'Mar 2026',
    description: 'Worked on data analysis and machine learning projects. Developed Python-based solutions for data processing and visualization.',
    skills: ['Python', 'Data Science', 'Machine Learning', 'Data Analysis'],
    type: 'internship',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHu5-gfxPV3-g/company-logo_200_200/company-logo_200_200/0/1693465192934?e=2147483647&v=beta&t=4dJJcQZVnqVq8V8Z1z_7QknLhp5oN8v_ZlqJ0V9sFc0',
    certificateUrl: '',
  },
  {
    id: '2',
    position: 'Software Engineer Intern',
    company: 'Bluestock™',
    location: 'Remote',
    startDate: 'Jan 2026',
    endDate: 'Feb 2026',
    description: 'Developed software solutions and contributed to backend development. Collaborated with senior engineers on feature implementation.',
    skills: ['Software Development', 'Backend', 'Problem Solving'],
    type: 'internship',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQGvsvp5YfZXXg/company-logo_200_200/company-logo_200_200/0/1692007365556?e=2147483647&v=beta&t=kfK8gW34H_Qm6J5w8QZ2u9YvHZ8Qm3n4K2L5v6P8R9',
    certificateUrl: '',
  },
  {
    id: '3',
    position: 'Python Internships',
    company: 'Pratinik Infotech',
    location: 'Remote',
    startDate: 'Dec 2025',
    endDate: 'Feb 2026',
    description: 'Focused on Python programming and problem-solving. Implemented various algorithms and data structures.',
    skills: ['Python', 'Problem Solving', 'Algorithms'],
    type: 'internship',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQGvsvp5YfZXXg/company-logo_200_200/company-logo_200_200/0/1692007365556?e=2147483647&v=beta&t=kfK8gW34H_Qm6J5w8QZ2u9YvHZ8Qm3n4K2L5v6P8R9',
    certificateUrl: '',
  },
  {
    id: '4',
    position: 'Data Analyst',
    company: 'Beau Roi',
    location: 'Remote',
    startDate: 'Jun 2025',
    endDate: 'Sep 2025',
    description: 'Analyzed business data and created visualizations for stakeholders. Provided insights for data-driven decision making.',
    skills: ['Data Analysis', 'Data Science', 'Excel', 'SQL', 'Tableau'],
    type: 'internship',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQGvsvp5YfZXXg/company-logo_200_200/company-logo_200_200/0/1692007365556?e=2147483647&v=beta&t=kfK8gW34H_Qm6J5w8QZ2u9YvHZ8Qm3n4K2L5v6P8R9',
    certificateUrl: '',
  },
];

export default function Experience() {
  const { isAuthenticated } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('experiences');
      return saved ? JSON.parse(saved) : defaultExperiences;
    } catch {
      return defaultExperiences;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    id: '',
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: [],
    type: 'internship',
    logo: '',
    certificateUrl: '',
  });
  const [skillInput, setSkillInput] = useState('');

  // Save experiences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('experiences', JSON.stringify(experiences));
    } catch {
      console.error('Failed to save experiences to localStorage');
    }
  }, [experiences]);

  const resetForm = () => {
    setFormData({
      id: '',
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: [],
      type: 'internship',
      logo: '',
      certificateUrl: '',
    });
    setSkillInput('');
    setEditingId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEditDialog = (experience: Experience) => {
    setFormData(experience);
    setEditingId(experience.id);
    setIsOpen(true);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSave = () => {
    if (!formData.position || !formData.company) {
      alert('Please fill in position and company');
      return;
    }

    if (editingId) {
      setExperiences(
        experiences.map((exp) => (exp.id === editingId ? formData : exp))
      );
    } else {
      const newExperience = {
        ...formData,
        id: Date.now().toString(),
      };
      setExperiences([newExperience, ...experiences]);
    }

    setIsOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Internships, projects, and professional experiences that shaped my career.
          </p>
        </motion.div>

        {/* Add Experience Button */}
        {isAuthenticated && (
          <div className="flex justify-end mb-8">
            <Button
              onClick={openAddDialog}
              className="bg-gradient-primary hover:opacity-90 text-white gap-2"
            >
              <Plus size={20} />
              Add Experience
            </Button>
          </div>
        )}

        {/* Experience Cards */}
        <div className="grid gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-16 h-16 rounded-lg object-cover bg-secondary p-1 border border-border"
                        />
                      ) : (
                        <div className="p-3 rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center">
                          <Briefcase className="text-primary" size={24} />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{exp.position}</CardTitle>
                        <p className="text-lg text-primary font-semibold mt-1">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(exp)}
                          className="gap-2"
                        >
                          <Edit2 size={16} />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(exp.id)}
                          className="text-destructive hover:text-destructive gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {exp.startDate} - {exp.endDate}
                      </div>
                      <Badge variant="secondary">{exp.type}</Badge>
                    </div>

                    <p className="text-foreground/80 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} className="bg-primary/20 text-primary hover:bg-primary/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {exp.type === 'internship' && exp.certificateUrl && (
                      <div className="pt-4">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all font-medium text-sm border border-blue-500/30"
                        >
                          📜 View Certificate
                        </motion.a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Experience Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Position *</label>
                <Input
                  placeholder="e.g., Software Engineer Intern"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Company *</label>
                <Input
                  placeholder="e.g., Tech Company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Company Logo URL</label>
                <Input
                  placeholder="e.g., https://example.com/logo.png"
                  value={formData.logo || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="mt-1"
                />
                {formData.logo && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-2">Logo Preview:</p>
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="h-16 object-contain rounded border border-border p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="e.g., Remote"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as 'internship' | 'fulltime' | 'freelance',
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="internship">Internship</option>
                    <option value="fulltime">Full-time</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    placeholder="e.g., Dec 2025"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    placeholder="e.g., Mar 2026"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your role and responsibilities..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 min-h-24"
                />
              </div>

              {formData.type === 'internship' && (
                <div>
                  <label className="text-sm font-medium">Certificate URL</label>
                  <Input
                    placeholder="Link to your internship certificate (optional)"
                    value={formData.certificateUrl || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, certificateUrl: e.target.value })
                    }
                    className="mt-1"
                    type="url"
                  />
                  {formData.certificateUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Certificate Preview:</p>
                      <div className="relative h-40 rounded-lg overflow-hidden border border-border bg-secondary/20">
                        <img
                          src={formData.certificateUrl}
                          alt="Certificate preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Skills</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Add a skill and press enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddSkill}
                    className="gap-2"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="gap-2 cursor-pointer bg-primary/20 text-primary hover:bg-primary/30"
                      >
                        {skill}
                        <X
                          size={14}
                          onClick={() => handleRemoveSkill(skill)}
                          className="cursor-pointer hover:text-destructive"
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-primary hover:opacity-90 text-white"
              >
                {editingId ? 'Update Experience' : 'Add Experience'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
