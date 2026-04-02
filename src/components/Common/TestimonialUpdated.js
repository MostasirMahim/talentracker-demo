"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    quotesIcon: "ri-double-quotes-l",
    feedbckText:
      "I had the pleasure of working with Talent Tracker as a client, and the experience was exceptional from start to finish. Their ability to understand our organizational needs, culture, and long-term vision truly set them apart.They demonstrated a highly professional and proactive approach, presenting well-screened, high-quality candidates within a short timeframe. What impressed me most was their attention to detail and commitment to finding not just the right skill set, but the right cultural fit for our team.Communication was always clear, timely, and transparent, making the entire hiring process smooth and efficient. Their market knowledge and strategic insight added significant value to our recruitment efforts.I would highly recommend Talent Tracker to any organization seeking a reliable and results-driven recruitment partner.",
    clientName: "Kazi Mohammad Jafar Sadek ",
    designation: "Group CHRO, Runner Group",
    image: "/images/testimonial/kazi_mohammad.jpg",
    altText: "Kazi Mohammad Jafar Sadek ",
  },
  {
    id: 2,
    quotesIcon: "ri-double-quotes-l",
    feedbckText:
      "Working with TalenTracker was the best decision for our HR restructuring. They provided insightful consultancy that helped us optimize our workforce management. Their training solutions have significantly improved our team's overall productivity.-dummy",
    clientName: "Sarah Ahmed",
    designation: "Operations Manager, Blue Horizon Ltd.",
    image: "/images/testimonial/testimonial2.jpg",
    altText: "Sarah Ahmed",
  },
  {
    id: 3,
    quotesIcon: "ri-double-quotes-l",
    feedbckText:
      "The expert trainers from TalenTracker are exceptional. They deep-dived into our specific industrial challenges and delivered a customized training program that resonated with our employees. We've seen a measurable impact on performance ever since.-dummy",
    clientName: "Tanveer Hassan",
    designation: "Managing Director, Global Tech Solutions",
    image: "/images/testimonial/testimonial3.jpg",
    altText: "Tanveer Hassan",
  },
];

const COLORS = {
  main: "#1489bc",
  main2: "#0e4c89",
  light: "#05b4ff",
  light2: "#05ffff",
  black: "#262E2E",
  white: "#ffffff",
  optional: "#666666",
};

const AvatarImg = ({ src, alt, size = 70 }) => {
  const [err, setErr] = useState(false);
  const initials = alt
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  if (err || !src)
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.main}22, ${COLORS.main}44)`,
          color: COLORS.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: size * 0.35,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", borderRadius: "50%", flexShrink: 0 }}
      onError={() => setErr(true)}
    />
  );
};

const Design5 = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="tu-design5-section">
      {/* Animated background mesh */}
      <div className="tu-d5-mesh" />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <SectionHeader
          badge="TESTIMONIALS"
          title="Let's Meet With"
          highlight="Our Client Says"
          description="From strategy to execution — real impact through talent partnership"
        />

        <div className="tu-d5-stage">
          {/* Main testimonial display */}
          <div className="tu-d5-showcase">
            <div className="tu-d5-showcase-card" key={active}>
              {/* Decorative elements */}
              <div className="tu-d5-deco-line tu-d5-deco-1" />
              <div className="tu-d5-deco-line tu-d5-deco-2" />

              <div className="tu-d5-showcase-content">
                <svg className="tu-d5-quote-svg" width="54" height="54" viewBox="0 0 24 24" fill="none">
                  <path d="M10 11H6V7h4v4zm8 0h-4V7h4v4z" fill={COLORS.main} />
                  <path d="M10 11v6l-4-2V11h4zm8 0v6l-4-2V11h4z" fill={COLORS.light} />
                </svg>

                <p className="tu-d5-show-text">
                  "{testimonials[active].feedbckText}"
                </p>

                <div className="tu-d5-author-row">
                  <div className="tu-d5-author-img-wrap">
                    <AvatarImg src={testimonials[active].image} alt={testimonials[active].altText} size={68} />
                    {/* Status indicator */}
                    <div className="tu-d5-status-dot" />
                  </div>
                  <div className="tu-d5-author-info">
                    <h5 className="tu-d5-author-name">{testimonials[active].clientName}</h5>
                    <p className="tu-d5-author-role">{testimonials[active].designation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation pills — Auto-carousel Marquee */}
          <div className="tu-d5-pills-carousel">
            <div className="tu-d5-pills-track">
              {/* Render twice for seamless loop */}
              {[...testimonials, ...testimonials].map((t, i) => {
                const isOriginal = i < testimonials.length;
                const realIndex = i % testimonials.length;
                return (
                  <button
                    key={`${t.id}-${i}`}
                    className={`tu-d5-pill ${realIndex === active ? "tu-d5-pill-active" : ""}`}
                    onClick={() => setActive(realIndex)}
                  >
                    <div className="tu-d5-pill-avatar">
                      <AvatarImg src={t.image} alt={t.altText} size={44} />
                    </div>
                    <div className="tu-d5-pill-info">
                      <span className="tu-d5-pill-name">{t.clientName}</span>
                      <span className="tu-d5-pill-desg">{t.designation}</span>
                    </div>
                    {/* Progress bar only on the active one */}
                    {realIndex === active && isOriginal && (
                      <div className="tu-d5-pill-progress" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* See More Button */}
          <div className="text-center mt-5">
            <Link href="#" className="default-btn tu-d5-see-more">
              Read More Stories <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

        .tu-design5-section {
          position: relative;
          padding: 90px 0;
          background: linear-gradient(135deg, #f8fbff 0%, #ffffff 50%, #f0f7ff 100%);
          overflow: hidden;
        }

        .tu-d5-mesh {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, ${COLORS.main}08 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${COLORS.light}05 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${COLORS.light2}04 0%, transparent 40%);
          animation: tu-d5-meshMove 12s ease-in-out infinite alternate;
        }
        @keyframes tu-d5-meshMove {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-10px, 10px); }
        }

        /* Section header overrides for light bg */
        .tu-design5-section .tu-sh-badge { background: rgba(20,137,188,0.1) !important; color: ${COLORS.main} !important; }
        .tu-design5-section .tu-sh-title { color: ${COLORS.black} !important; }
        .tu-design5-section .tu-sh-highlight { color: ${COLORS.main} !important; }
        .tu-design5-section .tu-sh-desc { color: ${COLORS.optional} !important; }

        .tu-d5-stage { max-width: 800px; margin: 0 auto; }

        .tu-d5-showcase-card {
          position: relative;
          background: #ffffff;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(20,137,188,0.1);
          border-radius: 28px;
          padding: 48px 44px;
          box-shadow: 0 20px 50px rgba(20,137,188,0.08);
          animation: tu-d5-slideIn .5s ease both;
          overflow: hidden;
        }
        @keyframes tu-d5-slideIn {
          from { opacity: 0; transform: translateY(20px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tu-d5-deco-line {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(20,137,188,0.05);
        }
        .tu-d5-deco-1 { width: 200px; height: 200px; top: -60px; right: -40px; }
        .tu-d5-deco-2 { width: 140px; height: 140px; bottom: -30px; left: -30px; }

        .tu-d5-showcase-content { position: relative; z-index: 1; }

        .tu-d5-quote-svg { 
          margin-bottom: 22px; 
          filter: drop-shadow(0 4px 10px ${COLORS.main}30);
        }

        .tu-d5-show-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.1rem;
          line-height: 1.8;
          color: ${COLORS.optional};
          font-style: italic;
          margin-bottom: 32px;
          letter-spacing: -0.01em;
          font-weight: 500;
        }

        .tu-d5-author-row { display: flex; align-items: center; gap: 18px; }
        .tu-d5-author-img-wrap {
          position: relative;
          padding: 3px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.main}, ${COLORS.light});
          flex-shrink: 0;
        }
        .tu-d5-author-img-wrap img, .tu-d5-author-img-wrap > div {
          border: 3px solid #ffffff;
        }
        .tu-d5-status-dot {
          position: absolute;
          bottom: 4px; right: 4px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #22c55e;
          border: 3px solid #ffffff;
        }
        .tu-d5-author-name { margin: 0 0 3px; font-size: 1.1rem; font-weight: 700; color: ${COLORS.black}; }
        .tu-d5-author-role { margin: 0 0 6px; font-size: .82rem; color: ${COLORS.main}; }
        .tu-d5-stars-row { display: flex; gap: 3px; }

        /* Pills — Auto-carousel Marquee Layout */
        .tu-d5-pills-carousel {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 40px;
          padding: 10px 0;
        }
        .tu-d5-pills-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: tu-d5-scroll 40s linear infinite;
        }
        .tu-d5-pills-track:hover {
          animation-play-state: paused;
        }

        @keyframes tu-d5-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .tu-d5-pill {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          border: 1px solid rgba(20,137,188,0.1);
          border-radius: 16px;
          padding: 14px 18px;
          cursor: pointer;
          transition: all .3s ease;
          position: relative;
          overflow: hidden;
          text-align: left;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          width: 260px;
          flex-shrink: 0;
        }
        .tu-d5-pill:hover { background: #fafdff; border-color: rgba(20,137,188,0.2); }
        .tu-d5-pill-active {
          background: rgba(20,137,188,0.05) !important;
          border-color: ${COLORS.main}70 !important;
          box-shadow: 0 6px 20px rgba(20,137,188,0.12);
        }

        .tu-d5-pill-avatar { flex-shrink: 0; }
        .tu-d5-pill-avatar img, .tu-d5-pill-avatar > div { border: 2px solid #ffffff; box-shadow: 0 0 0 2px ${COLORS.main}20; }

        .tu-d5-pill-info { display: flex; flex-direction: column; min-width: 0; }
        .tu-d5-pill-name {
          font-size: .85rem;
          color: ${COLORS.black};
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tu-d5-pill-desg {
          font-size: .75rem;
          color: ${COLORS.optional};
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tu-d5-pill-active .tu-d5-pill-name { color: ${COLORS.main}; }
        .tu-d5-pill-active .tu-d5-pill-desg { color: ${COLORS.main}bb; }

        .tu-d5-pill-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          background: linear-gradient(90deg, ${COLORS.main}, ${COLORS.light});
          border-radius: 0 0 16px 16px;
          animation: tu-d5-progress 7s linear;
          width: 100%;
        }
        @keyframes tu-d5-progress {
          from { width: 0; }
          to { width: 100%; }
        }

        /* See More Button light bg refinments */
        .tu-d5-see-more {
          color: ${COLORS.black} !important;
        }
        .tu-d5-see-more:hover {
          color: #ffffff !important;
        }

        @media (max-width: 991px) {
          .tu-d5-pills { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 767px) {
          .tu-d5-showcase-card { padding: 32px 22px; border-radius: 20px; }
          .tu-d5-pills { grid-template-columns: 1fr; gap: 10px; }
          .tu-d5-pill { padding: 12px 14px; }
          .tu-design5-section { padding: 60px 0; }
        }
      `}} />
    </section>
  );
};

const SectionHeader = ({ badge, title, highlight, description }) => (
  <div className="text-center mb-5">
    <span
      className="tu-sh-badge d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-semibold mb-3"
      style={{ backgroundColor: `${COLORS.main}14`, color: COLORS.main, fontSize: ".82rem", letterSpacing: "1px" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
      </svg>
      {badge}
    </span>
    <h2 className="tu-sh-title display-6 fw-bold mb-3">
      {title}{" "}
      <span className="tu-sh-highlight" style={{ color: COLORS.main }}>{highlight}</span>
    </h2>
    <p className="tu-sh-desc fs-5 mx-auto" style={{ maxWidth: 580, color: COLORS.optional }}>
      {description}
    </p>
  </div>
);

const TestimonialUpdated = () => {
  return <Design5 />;
};

export default TestimonialUpdated;
