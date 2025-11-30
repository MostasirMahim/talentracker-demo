"use client";
import { useState } from "react";
import Masonry from "react-masonry-css";
import "./masonry.css";
import Image from "next/image";
import Modal from "./ImageModal";

const MasonryGrid = ({ data: items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <div className="pt-70" style={{ width: "90%", margin: "auto" }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="grid-item"
              onClick={() => setSelectedItem(item)}
            >
              <div className="grid-item-wrapper">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.cover_image}`}
                  alt={item.title}
                  width={400}
                  height={300}
                  style={{ width: "100%", height: "auto" }}
                  className="grid-image"
                />
                <div className="grid-overlay">
                  <p className="grid-title">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default MasonryGrid;
