
import React, { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageCropper from './ImageCropper';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

export default function ImageUpload({ currentImage, onImageChange, className = "" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Only show upload functionality in development mode
  const isDevelopment = import.meta.env.DEV;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected image to show in cropper
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);

      // Reset input so same file can be selected again
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-cyber">
        <img
          src={currentImage}
          alt="Profile"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            console.log('Image failed to load:', e);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />

        {/* Upload overlay - only show in development */}
        {isDevelopment && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={handleUploadClick}
              disabled={isUploading}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              size="lg"
            >
              {isUploading ? (
                <Upload className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Camera className="mr-2 h-5 w-5" />
              )}
              {isUploading ? 'Uploading...' : 'Change Photo'}
            </Button>
          </div>
        )}
      </div>

      {/* File input - only render in development */}
      {isDevelopment && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      )}

      {/* Image Cropper */}
      {selectedFile && (
        <ImageCropper
          image={selectedFile}
          open={!!selectedFile}
          onClose={() => setSelectedFile(null)}
          onCropComplete={(croppedImage) => {
            onImageChange(croppedImage);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}
