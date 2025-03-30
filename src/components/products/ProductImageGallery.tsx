
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const { direction } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);

  const showNextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const selectThumbnail = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current || !zoomImageRef.current) return;

    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    
    // Calculate position as percentage of container
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Ensure values are within 0-1 range
    const boundedX = Math.max(0, Math.min(1, x));
    const boundedY = Math.max(0, Math.min(1, y));
    
    setZoomPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const calculateZoomStyles = () => {
    if (!isZoomed) return {};
    
    // Calculate position for the background image
    // We multiply by 100 to convert to % and subtract 50 to center the zoom
    const x = (zoomPosition.x * 100) - 50;
    const y = (zoomPosition.y * 100) - 50;
    
    return {
      backgroundImage: `url(${images[currentIndex].src})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%',
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <div className="relative" dir={direction}>
      {/* Main Image with Zoom */}
      <div 
        ref={mainImageRef}
        className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 aspect-square"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].alt} 
          className={`w-full h-full object-contain transition-opacity ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Zoom overlay */}
        <div 
          ref={zoomImageRef}
          className={`absolute inset-0 transition-opacity ${isZoomed ? 'opacity-100' : 'opacity-0'}`}
          style={calculateZoomStyles()}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 rounded-full shadow"
              onClick={showPrevImage}
            >
              {direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 rounded-full shadow"
              onClick={showNextImage}
            >
              {direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`relative h-20 w-20 flex-shrink-0 rounded border-2 overflow-hidden ${
                index === currentIndex ? 'border-shop-primary' : 'border-transparent'
              }`}
              onClick={() => selectThumbnail(index)}
            >
              <img 
                src={image.src} 
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
