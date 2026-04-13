import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  type: 'Full Stack' | 'Data Science' | 'Data Analyst' | 'Python';
  technologies: string;
  features: string;
  githubLink: string;
  livePageUrl?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  initialData?: ProjectFormData;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ProjectFormData['type']>('Full Stack');
  const [technologies, setTechnologies] = useState('');
  const [features, setFeatures] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [livePageUrl, setLivePageUrl] = useState('');

  const isEditing = !!initialData?.id;

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setType(initialData.type || 'Full Stack');
        setTechnologies(initialData.technologies || '');
        setFeatures(initialData.features || '');
        setGithubLink(initialData.githubLink || '');
        setLivePageUrl(initialData.livePageUrl || '');
      } else {
        setTitle('');
        setDescription('');
        setType('Full Stack');
        setTechnologies('');
        setFeatures('');
        setGithubLink('');
        setLivePageUrl('');
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const formData: ProjectFormData = {
      ...(initialData?.id && { id: initialData.id }),
      title: title.trim(),
      description: description.trim(),
      type,
      technologies: technologies.trim(),
      features: features.trim(),
      githubLink: githubLink.trim(),
      livePageUrl: livePageUrl.trim() || undefined,
    };

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border/50"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border/50 min-h-32"
              required
            />
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Project Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as ProjectFormData['type'])}>
              <SelectTrigger id="type" className="border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Stack">Full Stack</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
            <Textarea
              id="technologies"
              placeholder="e.g., Python, React, Node.js, PostgreSQL"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="border-border/50 min-h-20"
            />
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <Label htmlFor="features">Key Features (one per line)</Label>
            <Textarea
              id="features"
              placeholder="e.g., Feature 1&#10;Feature 2&#10;Feature 3"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="border-border/50 min-h-24"
            />
          </div>

          {/* GitHub Link */}
          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub Link</Label>
            <Input
              id="githubLink"
              type="url"
              placeholder="https://github.com/username/repository"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="border-border/50"
            />
          </div>

          {/* Live Page URL */}
          <div className="space-y-2">
            <Label htmlFor="livePageUrl">Live Page URL (Optional)</Label>
            <Input
              id="livePageUrl"
              type="url"
              placeholder="https://your-project-url.com"
              value={livePageUrl}
              onChange={(e) => setLivePageUrl(e.target.value)}
              className="border-border/50"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
