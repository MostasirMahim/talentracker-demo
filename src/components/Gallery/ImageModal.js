"use client"
import Image from "next/image"
import "./modal.css"

const ImageModal = ({ item, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-image-container">
          <div className="modal-image-wrapper">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.cover_image}`}
              alt={item.title}
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              className="modal-image"
            />
          </div>
        </div>

        <div className="modal-info">
          {item.category?.name && <p className="modal-category">{item.category.name}</p>}
          <h2 className="modal-title">{item.title}</h2>
          <p className="modal-description">{item.description || "No description available"}</p>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
