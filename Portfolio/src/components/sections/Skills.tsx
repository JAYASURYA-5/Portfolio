import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, BarChart3, FileSpreadsheet, Brain, TrendingUp, Layers, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Skill {
  id: string;
  name: string;
  level: number;
  description: string;
  iconType: 'code' | 'database' | 'chart' | 'spreadsheet' | 'brain' | 'trending' | 'layers';
}

const iconMap = {
  code: Code,
  database: Database,
  chart: BarChart3,
  spreadsheet: FileSpreadsheet,
  brain: Brain,
  trending: TrendingUp,
  layers: Layers,
};

const iconOptions = [
  { value: 'code', label: 'Code', icon: Code },
  { value: 'database', label: 'Database', icon: Database },
  { value: 'chart', label: 'Chart', icon: BarChart3 },
  { value: 'spreadsheet', label: 'Spreadsheet', icon: FileSpreadsheet },
  { value: 'brain', label: 'Brain', icon: Brain },
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'layers', label: 'Layers', icon: Layers },
];

const defaultSkills: Skill[] = [
  {
    id: '1',
    name: "Python",
    level: 90,
    description: "Data manipulation, ML libraries (Pandas, Scikit-learn, NumPy)",
    iconType: 'code',
  },
  {
    id: '2',
    name: "Power BI",
    level: 85,
    description: "Interactive dashboards, DAX formulas, data modeling",
    iconType: 'chart',
  },
  {
    id: '3',
    name: "SQL",
    level: 80,
    description: "Complex queries, database optimization, data extraction",
    iconType: 'database',
  },
  {
    id: '4',
    name: "Excel",
    level: 88,
    description: "Advanced formulas, pivot tables, data analysis",
    iconType: 'spreadsheet',
  },
  {
    id: '5',
    name: "Data Analysis",
    level: 92,
    description: "Statistical analysis, data cleaning, insight generation",
    iconType: 'trending',
  },
  {
    id: '6',
    name: "Data Science",
    level: 90,
    description: "Machine learning, predictive modeling, data visualization",
    iconType: 'brain',
  },
  {
    id: '7',
    name: "Full Stack Development",
    level: 90,
    description: "Frontend & backend development, web applications, REST APIs",
    iconType: 'layers',
  }
];

export default function Skills() {
  const { isAuthenticated } = useAuth();
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem('skills');
      return saved ? JSON.parse(saved) : defaultSkills;
    } catch {
      return defaultSkills;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill>({
    id: '',
    name: '',
    level: 50,
    description: '',
    iconType: 'code',
  });

  // Save skills to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('skills', JSON.stringify(skills));
    } catch {
      console.error('Failed to save skills to localStorage');
    }
  }, [skills]);

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      level: 50,
      description: '',
      iconType: 'code',
    });
    setEditingId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEditDialog = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || formData.name.trim() === '') {
      alert('Please enter a skill name');
      return;
    }

    if (editingId) {
      setSkills(skills.map((s) => (s.id === editingId ? formData : s)));
    } else {
      const newSkill = {
        ...formData,
        id: Date.now().toString(),
      };
      setSkills([...skills, newSkill]);
    }

    setIsOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

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

        {/* Add Skills Button */}
        {isAuthenticated && (
          <div className="flex justify-end mb-8">
            <Button
              onClick={openAddDialog}
              className="bg-gradient-primary hover:opacity-90 text-white gap-2"
            >
              <Plus size={20} />
              Add Skill
            </Button>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.iconType];
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-cyber transition-all duration-300 hover:border-primary/30">
                  {/* Icon and Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">{skill.name}</h3>
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(skill);
                          }}
                          className="p-1.5 hover:bg-primary/20 rounded-lg z-10"
                        >
                          <Edit2 size={14} className="text-primary" />
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(skill.id);
                          }}
                          className="p-1.5 hover:bg-destructive/20 rounded-lg z-10"
                        >
                          <Trash2 size={14} className="text-destructive" />
                        </motion.button>
                      </div>
                    )}
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
            );
          })}
        </div>

        {/* Add/Edit Skill Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Skill Name *</label>
                <Input
                  placeholder="e.g., Python"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Icon Type</label>
                <select
                  value={formData.iconType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      iconType: e.target.value as Skill['iconType'],
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Proficiency Level: {formData.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: parseInt(e.target.value) })
                  }
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your proficiency and experience with this skill..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 min-h-24"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-primary">
                {editingId ? 'Update Skill' : 'Add Skill'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
