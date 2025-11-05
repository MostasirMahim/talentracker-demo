"use client";
  
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const services = [
  {
    id: 1,
    icon: "ri-group-2-line",
    title: "Human Consultancy",
    shortDec:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 2,
    icon: "ri-briefcase-line",
    title: "Solicitor Consultancy",
    shortDec:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 3,
    icon: "ri-money-dollar-box-line",
    title: "Financial Consultancy",
    shortDec:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 4,
    icon: "ri-settings-2-line",
    title: "Strategy Consultancy",
    shortDec:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 5,
    icon: "ri-restart-line",
    title: "Tax Consultancy",
    shortDec:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 6,
    icon: "ri-lightbulb-flash-line",
    title: "Financial Consultancy",
    shortDec:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    detailsUrl: "/services/details",
  },
];

const ServicesSlider = () => {
  return (
    <>
      <div className="services-area ptb-100 bg-fbf9f7">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">SERVICES</span>
            <h2>Our All of The Services At a Glance</h2>
          </div>

          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="services-slides-two"
          >
            {services &&
              services.map((item) => (
                <SwiperSlide className="single-services-item" key={item.id}>
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                  <h3>
                    <Link href={item.detailsUrl}>{item.title}</Link>
                  </h3>
                  <p>{item.shortDec}</p>

                  <Link href={item.detailsUrl} className="link-btn">
                    {item.readMoreText}
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ServicesSlider;
