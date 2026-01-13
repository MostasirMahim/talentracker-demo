"use client";

import { useEffect, useRef } from "react";
import "./trainer_carousel.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

function TrainerCarousel({ trainers }) {
  const trackRef = useRef(null);
  const router = useRouter();
  const setDuration = () => {
    if (!trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth / 2;
    const SPEED_PX_PER_SEC = 50;
    const duration = totalWidth / SPEED_PX_PER_SEC;
    trackRef.current.style.setProperty("--duration", `${duration}s`);
  };

  useEffect(() => {
    setDuration();
    window.addEventListener("resize", setDuration);
    return () => window.removeEventListener("resize", setDuration);
  }, []);

  return (
    <div className="page">
      <div className="trainer-header">
        <h1 className="trainer-title">Our Expert Trainers</h1>
        <p className="trainer-subtitle">Meet our team of industry experts</p>
      </div>
      <div className="marquee">
        <div className="track" ref={trackRef}>
          {trainers?.map((card) => (
            <article
              onClick={() => router.push(`/trainers/${card.id}`)}
              key={`${card.id}-1`}
              className="card-x card-content-x"
            >
              <div className="author">
                <div className="avatar">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${card.profile_picture}`}
                    alt={card.name}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="who">
                  <div className="name">{card.name}</div>
                  <div className="title">{card.expertise}</div>
                </div>
              </div>
            </article>
          ))}
          {trainers?.map((card) => (
            <article
              onClick={() => router.push(`/trainers/${card.id}`)}
              key={`${card.id}-1`}
              className="card-x card-content-x"
            >
              <div className="author">
                <div className="avatar">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${card.profile_picture}`}
                    alt={card.name}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="who">
                  <div className="name">{card.name}</div>
                  <div className="title">{card.expertise}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TrainerCarousel;
