"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./multi-image-modal.css";

const MultiImageModal = ({ images, initialImage, onClose }) => {
  const initialIdx = images.findIndex((img) => img.image === initialImage);
  const [currentIndex, setCurrentIndex] = useState(initialIdx !== -1 ? initialIdx : 0);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleThumbnailClick = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="tt-mim-overlay" onClick={onClose}>
      <div className="tt-mim-content" onClick={(e) => e.stopPropagation()}>
        <div className="tt-mim-header">
          <button className="tt-mim-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="tt-mim-viewport">
          <button className="tt-mim-nav-btn tt-mim-prev" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>

          <div className="tt-mim-image-container">
            <Image
              key={currentImage?.image}
              src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${currentImage?.image}`}
              alt={`Gallery image ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="tt-mim-main-img"
              priority
            />
          </div>

          <button className="tt-mim-nav-btn tt-mim-next" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="tt-mim-footer">
          <div className="tt-mim-counter">
            {currentIndex + 1} / {images.length}
          </div>
          
          <div className="tt-mim-thumb-strip">
            {images.map((item, index) => (
              <div
                key={index}
                className={`tt-mim-thumb-item ${index === currentIndex ? "active-thumb" : ""}`}
                onClick={(e) => handleThumbnailClick(index, e)}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item?.image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="tt-mim-thumb-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiImageModal;
