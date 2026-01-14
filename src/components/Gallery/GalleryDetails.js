"use client";
import { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { Calendar, Images, Layers2, SearchX } from "lucide-react";
import "./gallery-details.css";
import ImageModal from "./ImageModal";

const GalleryDetails = ({ gallery, images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div
        className="gallery-header"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_API_URL}${gallery?.cover_image})`,
        }}
      >
        <div className="gallery-header-overlay"></div>
        <div className="gallery-header-content">
          <p className="gallery-header-category">
            <Layers2
              size={14}
              style={{ display: "inline", marginRight: "6px" }}
            />
            {gallery?.category?.name}
          </p>
          <h1 className="gallery-header-title">{gallery?.title}</h1>
          <div className="gallery-header-meta">
            <span className="gallery-header-date">
              <Calendar size={16} />
              {formatDate(gallery?.updated_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="gallery-grid-section">
        <div className="gallery-container">
          <div className="gallery-section-header">
            <div className="gallery-section-icon">
              <Images size={28} />
            </div>
            <div>
              <h2 className="gallery-section-title">Gallery Collection</h2>
              <p className="gallery-section-subtitle">{gallery?.description}</p>
            </div>
          </div>

          {images && images.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="gallery-masonry-grid"
              columnClassName="gallery-masonry-grid_column"
            >
              {images?.map((item, index) => (
                <div
                  key={index}
                  className="gallery-grid-item"
                  onClick={() => setSelectedImage(item?.image)}
                >
                  <div className="gallery-grid-wrapper">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item?.image}`}
                      alt="Gallery image"
                      width={400}
                      height={300}
                      style={{ width: "100%", height: "100%" }}
                      className="gallery-grid-image"
                    />
                  </div>
                </div>
              ))}
            </Masonry>
          ) : (
             <div
                    style={{
                      minHeight: "60vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f1f5f9",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        maxWidth: "420px",
                        backgroundColor: "#ffffff",
                        padding: "42px 32px",
                        borderRadius: "14px",
                        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          margin: "0 auto 16px",
                          borderRadius: "50%",
                          backgroundColor: "#e0f2fe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SearchX size={30} color="#0284c7" />
                      </div>
            
                      {/* Title */}
                      <h2
                        style={{
                          marginBottom: "10px",
                          fontSize: "22px",
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        No Pictures Found
                      </h2>
            
                      {/* Description */}
                      <p
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          color: "#64748b",
                          lineHeight: 1.6,
                        }}
                      >
                        There are no images available right now. Please check back
                        later for the latest updates.
                      </p>
                    </div>
                  </div>
          )}
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default GalleryDetails;
