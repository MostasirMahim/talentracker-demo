"use client";
import Image from "next/image";
import { X } from "lucide-react";
import "./modal.css";

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="image-modal-container">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${image}`}
            alt="Gallery image"
            width={1200}
            height={800}
            className="image-modal-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
