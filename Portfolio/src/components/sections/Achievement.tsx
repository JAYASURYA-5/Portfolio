import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, MapPin, Calendar, Plus, Edit2, Trash2, X, Award, BookOpen, Heart } from 'lucide-react';
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

interface Achievement {
  id: string;
  title: string;
  category: 'hackathon' | 'patent' | 'conference' | 'journal' | 'award' | 'certification';
  issuer: string;
  date: string;
  description: string;
  certificateUrl?: string;
  proofUrl?: string;
  isFavorite?: boolean;
}

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'SMARTATHON 2.0 Finalist',
    category: 'hackathon',
    issuer: 'SMARTATHON',
    date: 'Feb 2026',
    description: 'Selected as a Finalist in SMARTATHON 2.0, a 24-hour hackathon where innovation meets technology. Competed among talented participants to brainstorm, design, and build impactful solutions with problem-solving skills, creativity, and technical expertise in a high-pressure innovation environment. Team ID: S220.',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'TechSprint - Google Developer Group Finalist',
    category: 'hackathon',
    issuer: 'Google Developer Group on Campus (GGCT)',
    date: '2026',
    description: 'Shortlisted team for the GDG GGCT TechSprint hackathon at Colan Ganga College of Technology. Competed for the opportunity to innovate with cutting-edge tools, industry-level practices, and exposure to next-generation technologies addressing real-world challenges.',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Avishkaar Season 3 - Physical Hackathon',
    category: 'hackathon',
    issuer: 'Avishkaar',
    date: 'Dec 27-29, 2025',
    description: 'Officially shortlisted for the Physical Round of Avishkaar Season 3, one of South India\'s biggest innovation-driven hackathons. Competing on a national platform to solve real-world problems through technology, creativity, and rapid prototyping. A chance to collaborate with brightest minds and represent AIT Coimbatore at this prestigious level.',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'ZENITH 25 - The Cloud Voyage Finalist',
    category: 'hackathon',
    issuer: 'ZENITH 25 / SCOPE Club',
    date: '2026',
    description: 'Officially shortlisted for ZENITH 25 - The Cloud Voyage Finalist. Selected among several strong submissions, this achievement reinforces hard work, late-night brainstorming, and passion invested into cloud-based innovation projects. Excited to showcase innovation in the final hackathon round.',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'DevForge Hackathon - Offline Round Finalist',
    category: 'hackathon',
    issuer: 'Scaler School of Technology',
    date: 'Nov 27, 2025',
    description: 'Selected for the Offline Round of DevForge Hackathon at Scaler School of Technology, Bengaluru. Competing among 2,000+ registered teams in a 24-hour overnight hackathon with prize pool of ₹1,00,000. Representing the institution to innovate, build, and learn with amazing talents from across the country.',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'HackLoop 2025 Finals',
    category: 'hackathon',
    issuer: 'HackLoop / ThoughtWorks Technologies',
    date: 'Feb 2025',
    description: 'Made it to the Finals of HackLoop 2025, held at ThoughtWorks Technologies, Gurugram. Received Certificate of Achievement for showcasing exceptional skills and contributing impactful solutions. An incredible journey of innovation, problem-solving, and teamwork that strengthened skills and opened opportunities to learn and grow.',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: false,
  },
];

const categoryConfig = {
  hackathon: { icon: '🏆', color: 'from-yellow-500/20 to-yellow-500/10', label: 'Hackathon', textColor: 'text-yellow-600' },
  patent: { icon: '📋', color: 'from-purple-500/20 to-purple-500/10', label: 'Patent', textColor: 'text-purple-600' },
  conference: { icon: '🎤', color: 'from-blue-500/20 to-blue-500/10', label: 'Conference', textColor: 'text-blue-600' },
  journal: { icon: '📄', color: 'from-green-500/20 to-green-500/10', label: 'Journal', textColor: 'text-green-600' },
  award: { icon: '⭐', color: 'from-red-500/20 to-red-500/10', label: 'Award', textColor: 'text-red-600' },
  certification: { icon: '✅', color: 'from-indigo-500/20 to-indigo-500/10', label: 'Certification', textColor: 'text-indigo-600' },
};

export default function Achievement() {
  const { isAuthenticated } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('achievements');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only use saved data if it's not empty, otherwise use defaults
        return parsed && parsed.length > 0 ? parsed : defaultAchievements;
      }
      return defaultAchievements;
    } catch {
      return defaultAchievements;
    }
  });

  const [filter, setFilter] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [formData, setFormData] = useState<Achievement>({
    id: '',
    title: '',
    category: 'hackathon',
    issuer: '',
    date: '',
    description: '',
    certificateUrl: '',
    proofUrl: '',
    isFavorite: false,
  });

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    } catch {
      console.error('Failed to save achievements to localStorage');
    }
  }, [achievements]);

  // Initialize with defaults if empty
  useEffect(() => {
    if (achievements.length === 0) {
      setAchievements(defaultAchievements);
    }
  }, []);

  // Auto-scroll for top achievements
  useEffect(() => {
    const topAchievements = achievements.filter((a) => a.isFavorite);
    if (topAchievements.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTopIndex((prev) => (prev + 1) % topAchievements.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [achievements]);

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      category: 'hackathon',
      issuer: '',
      date: '',
      description: '',
      certificateUrl: '',
      proofUrl: '',
      isFavorite: false,
    });
    setEditingId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEditDialog = (achievement: Achievement) => {
    setFormData(achievement);
    setEditingId(achievement.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.issuer) {
      alert('Please fill in title and issuer');
      return;
    }

    if (editingId) {
      setAchievements(
        achievements.map((a) => (a.id === editingId ? formData : a))
      );
    } else {
      const newAchievement = {
        ...formData,
        id: Date.now().toString(),
      };
      setAchievements([newAchievement, ...achievements]);
    }

    setIsOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter((a) => a.id !== id));
    }
  };

  const toggleFavorite = (id: string) => {
    setAchievements(
      achievements.map((a) =>
        a.id === id ? { ...a, isFavorite: !a.isFavorite } : a
      )
    );
  };

  const filteredAchievements =
    filter === 'all'
      ? achievements
      : achievements.filter((a) => a.category === filter);

  const categoryKeys = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hackathons, patents, conferences, and recognition that showcase excellence.
          </p>
        </motion.div>

        {/* Add Achievement Button */}
        {isAuthenticated && (
          <div className="flex justify-end mb-8">
            <Button
              onClick={openAddDialog}
              className="bg-gradient-primary hover:opacity-90 text-white gap-2"
            >
              <Plus size={20} />
              Add Achievement
            </Button>
          </div>
        )}

        {/* Top Achievements Section */}
        {(() => {
          const topAchievements = achievements.filter((a) => a.isFavorite);
          if (topAchievements.length > 0) {
            const currentAchievement = topAchievements[currentTopIndex];
            const config = categoryConfig[currentAchievement.category];
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    <span>Top Achievements</span>
                    <span className="text-yellow-500">⭐</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    My favorite and most valued achievements
                  </p>
                </div>

                <div className="relative">
                  <motion.div
                    key={currentAchievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => {
                      setSelectedAchievement(currentAchievement);
                      setViewModalOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Card className={`border-2 border-gradient-primary/50 hover:border-primary transition-all hover:shadow-2xl group overflow-hidden bg-gradient-to-br ${config.color}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-5xl opacity-90">{config.icon}</div>
                          {isAuthenticated && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(currentAchievement.id);
                              }}
                              className="p-2 hover:bg-red-500/20 rounded-lg"
                            >
                              <Heart
                                size={20}
                                className="text-red-500 fill-red-500"
                              />
                            </motion.button>
                          )}
                        </div>
                        <CardTitle className="text-2xl mt-3">
                          {currentAchievement.title}
                        </CardTitle>
                        <p className={`text-base font-bold mt-2 ${config.textColor}`}>
                          {currentAchievement.issuer}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={16} />
                          {currentAchievement.date}
                        </div>

                        <p className="text-base text-foreground/80 leading-relaxed">
                          {currentAchievement.description}
                        </p>

                        <div className="flex gap-2 pt-2 flex-wrap">
                          {currentAchievement.certificateUrl && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAchievement(currentAchievement);
                                setViewModalOpen(true);
                              }}
                              className="text-sm px-4 py-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all font-medium"
                            >
                              View Certificate
                            </motion.button>
                          )}
                          {currentAchievement.proofUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={currentAchievement.proofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm px-4 py-2 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-all font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Evidence
                            </motion.a>
                          )}
                        </div>

                        <Badge className="inline-block bg-primary/30 text-primary text-sm py-1">
                          {config.label}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {topAchievements.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentTopIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentTopIndex
                            ? 'bg-primary w-8'
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Auto-scroll indicator */}
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Auto-scrolling in {topAchievements.length} achievement{topAchievements.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </motion.div>
            );
          }
          return null;
        })()}


        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-gradient-primary text-white shadow-lg shadow-primary/50'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            All
          </motion.button>
          {categoryKeys.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                filter === category
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary/50'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              <span>{categoryConfig[category].icon}</span>
              {categoryConfig[category].label}
            </motion.button>
          ))}
        </div>

        {/* Achievement Cards Grid */}
        {filteredAchievements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy size={48} className="mx-auto opacity-30 mb-4" />
            <p className="text-muted-foreground text-lg">
              {filter === 'all'
                ? 'No achievements yet. Add one to get started!'
                : `No ${categoryConfig[filter as keyof typeof categoryConfig]?.label} achievements yet.`}
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => {
              const config = categoryConfig[achievement.category];
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedAchievement(achievement);
                    setViewModalOpen(true);
                  }}
                >
                  <Card className={`border border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl group overflow-hidden bg-gradient-to-br ${config.color} cursor-pointer`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-3xl opacity-80">{config.icon}</div>
                        {isAuthenticated && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(achievement.id);
                              }}
                              className="p-1.5 hover:bg-red-500/20 rounded-lg"
                            >
                              <Heart
                                size={14}
                                className={`${
                                  achievement.isFavorite
                                    ? 'text-red-500 fill-red-500'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditDialog(achievement)}
                              className="p-1.5 hover:bg-primary/20 rounded-lg"
                            >
                              <Edit2 size={14} className="text-primary" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(achievement.id)}
                              className="p-1.5 hover:bg-destructive/20 rounded-lg"
                            >
                              <Trash2 size={14} className="text-destructive" />
                            </motion.button>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{achievement.title}</CardTitle>
                      <p className={`text-sm font-semibold mt-1 ${config.textColor}`}>
                        {achievement.issuer}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {achievement.date}
                      </div>

                      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                        {achievement.description}
                      </p>

                      {/* Links to Certificate/Proof */}
                      <div className="flex gap-2 pt-2">
                        {achievement.certificateUrl && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAchievement(achievement);
                              setViewModalOpen(true);
                            }}
                            className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all font-medium"
                          >
                            View Certificate
                          </motion.button>
                        )}
                        {achievement.proofUrl && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={achievement.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-all font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Evidence
                          </motion.a>
                        )}
                      </div>

                      <Badge className="inline-block bg-primary/30 text-primary">
                        {config.label}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Add/Edit Achievement Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Achievement' : 'Add New Achievement'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  placeholder="e.g., AI Hackathon Winner"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as Achievement['category'],
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
                >
                  {categoryKeys.map((category) => (
                    <option key={category} value={category}>
                      {categoryConfig[category].label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Issuer/Organization *</label>
                <Input
                  placeholder="e.g., Tech Conference 2024"
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  placeholder="e.g., Mar 2026"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Describe your achievement..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 min-h-24"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Certificate URL</label>
                <Input
                  placeholder="Link to your certificate (optional)"
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

              <div>
                <label className="text-sm font-medium">Proof/Evidence URL</label>
                <Input
                  placeholder="Link to proof or evidence (optional)"
                  value={formData.proofUrl || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, proofUrl: e.target.value })
                  }
                  className="mt-1"
                  type="url"
                />
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
                {editingId ? 'Update Achievement' : 'Add Achievement'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Achievement Modal */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedAchievement?.title}
              </DialogTitle>
            </DialogHeader>

            {selectedAchievement && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Details */}
                <div className="space-y-6">
                  {/* Achievement Details */}
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                      Organization
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {selectedAchievement.issuer}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                      Date
                    </p>
                    <p className="text-base font-semibold flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      {selectedAchievement.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                      Category
                    </p>
                    <Badge className="bg-primary/30 text-primary capitalize py-1 px-3 text-sm">
                      {selectedAchievement.category}
                    </Badge>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                      Description
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-sm">
                      {selectedAchievement.description}
                    </p>
                  </div>

                  {/* External Links */}
                  <div className="flex flex-col gap-3 pt-4">
                    {selectedAchievement.certificateUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedAchievement.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-primary text-white hover:opacity-90 transition-all font-medium text-center"
                      >
                        Open Full Certificate
                      </motion.a>
                    )}
                    {selectedAchievement.proofUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedAchievement.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition-all font-medium text-center"
                      >
                        View Evidence
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Right Side - Certificate Image */}
                {selectedAchievement.certificateUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-primary/30 shadow-2xl bg-black">
                      <img
                        src={selectedAchievement.certificateUrl}
                        alt={selectedAchievement.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                )}

                {/* Fallback when no certificate */}
                {!selectedAchievement.certificateUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center bg-secondary/30 rounded-lg p-8 min-h-96"
                  >
                    <div className="text-center">
                      <Trophy size={64} className="mx-auto opacity-30 mb-4" />
                      <p className="text-muted-foreground">
                        No certificate image available
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
