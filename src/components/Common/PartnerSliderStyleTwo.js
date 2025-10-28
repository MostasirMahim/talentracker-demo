"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const partners = [
  {
    id: 1,
    image: "/images/partner/white-partner1.png",
    altText: "partner",
    link: "#",
  },
  {
    id: 2,
    image: "/images/partner/white-partner2.png",
    altText: "partner",
    link: "#",
  },
  {
    id: 3,
    image: "/images/partner/white-partner3.png",
    altText: "partner",
    link: "#",
  },
  {
    id: 4,
    image: "/images/partner/white-partner4.png",
    altText: "partner",
    link: "#",
  },
  {
    id: 5,
    image: "/images/partner/white-partner5.png",
    altText: "partner",
    link: "#",
  },
];

const PartnerSliderStyleTwo = () => {
  return (
    <>
      <div className="partner-area bg-black pb-100">
        <div className="container">
          <Swiper
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              992: {
                slidesPerView: 5,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="partner-slides"
          >
            {partners &&
              partners.map((logo) => (
                <SwiperSlide className="single-partner-item" key={logo.id}>
                  <a href={logo.link} className="d-inline-block">
                    <Image
                      src={logo.image}
                      alt={logo.altText}
                      width={90}
                      height={54}
                    />
                  </a>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default PartnerSliderStyleTwo;
