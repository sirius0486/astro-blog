"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

interface ImageViewerProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function MasonryGallery({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "";
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null
    );
  };

  return (
    <>
      {/* 画廊网格代码 */}
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          onClick={() => openImageViewer(index)}
          className="gallery-item relative overflow-hidden rounded-lg shadow-md cursor-pointer"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto block"
          />
        </motion.div>
      ))}

      {selectedImageIndex !== null && (
        <ImageViewer
          images={images}
          currentIndex={selectedImageIndex}
          onClose={closeImageViewer}
          onPrev={goToPrevImage}
          onNext={goToNextImage}
        />
      )}
    </>
  );
}

export function ImageViewer({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
          setIsLoading(true);
        }}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
          setIsLoading(true);
        }}
      >
        <ChevronRight size={24} />
      </button>

      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex].src}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-[90vh] object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onLoad={handleImageLoad}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
