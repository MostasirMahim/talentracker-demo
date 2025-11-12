"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./custom.css";

export default function StrategicPartners() {
  const partners = [
    { id: 1, logo: "/images/partner/partner1.png", alt: "Partner 1" },
    { id: 2, logo: "/images/partner/partner2.png", alt: "Partner 2" },
    { id: 3, logo: "/images/partner/partner3.png", alt: "Partner 3" },
    { id: 4, logo: "/images/partner/partner4.png", alt: "Partner 4" },
    { id: 5, logo: "/images/partner/partner5.png", alt: "Partner 5" },
    { id: 5, logo: "/images/partner/partner5.png", alt: "Partner 5" },
    { id: 5, logo: "/images/partner/partner5.png", alt: "Partner 5" },
    { id: 5, logo: "/images/partner/partner5.png", alt: "Partner 5" },
  ];

  return (
    <section className="strategic-partners-section py-5">
      <div className="container text-center">
        <h2 className="fw-bold text-primary mb-4">Our Strategic Partners</h2>
        <p className="text-muted mb-5">
          Trusted collaborations powering our success across industries.
        </p>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          slidesPerView={5}
          spaceBetween={30}
          allowTouchMove={false}
          speed={4000} // controls how fast it scrolls
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            576: { slidesPerView: 3, spaceBetween: 25 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            992: { slidesPerView: 5, spaceBetween: 35 },
          }}
          className="partner-swiper"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="partner-logo-card">
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="partner-logo img-fluid"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
