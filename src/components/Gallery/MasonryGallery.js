"use client";
import Masonry from "react-masonry-css";
import "./masonry.css";
import Image from "next/image";
import SmartPagination from "../SmartPagination/SmartPagination";
import { useRouter } from "next/navigation";
import { Layers2, Search, SearchX } from "lucide-react";

const MasonryGrid = ({ data: items, pagination }) => {
  const router = useRouter();
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
if(items?.length === 0){
  return (
    <>
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
            No Gallery Found
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
            There are no gallery available right now. Please check back
            later for the latest updates.
          </p>
        </div>
      </div>
    </>
  );
}
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
              onClick={() => router.push(`/gallery/${item.id}`)}
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
                <div className="grid-info">
                  <p className="grid-title">{item.title}</p>
                  <p className="grid-category"><Layers2 className="grid-category-icon" size={14} /> {item.category?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
      <SmartPagination paginationData={pagination} />
    </>
  );
};

export default MasonryGrid;
