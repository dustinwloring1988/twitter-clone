import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

export function ImageLightbox({ imageUrl, altText, onClose }: ImageLightboxProps) {
  // Close on background click but not on image click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
} 