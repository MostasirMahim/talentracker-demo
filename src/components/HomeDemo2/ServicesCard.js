"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const services = [
  {
    id: 1,
    image: "/images/services/services1.jpg",
    altText: "Service Image",
    title: "Financial Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 2,
    image: "/images/services/services2.jpg",
    altText: "Service Image",
    title: "Strategy Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 3,
    image: "/images/services/services4.jpg",
    altText: "Service Image",
    title: "Organizational Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 4,
    image: "/images/services/services4.jpg",
    altText: "Service Image",
    title: "Tax Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 6,
    image: "/images/services/services6.jpg",
    altText: "Service Image",
    title: "Marketing Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 7,
    image: "/images/services/services7.jpg",
    altText: "Service Image",
    title: "Startup Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
];

const ServicesCard = () => {
  return (
    <>
      <div className="services-area pt-100">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">SERVICES</span>
            <h2>Our Dedicated Services</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore.
            </p>
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
            className="services-slides"
          >
            {services &&
              services.map((service) => (
                <SwiperSlide className="single-services-box" key={service.id}>
                  <div className="image">
                    <Link href={service.detailsUrl}>
                      <Image
                        src={service.image}
                        alt={service.altText}
                        width={860}
                        height={622}
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <h3>
                      <Link href={service.detailsUrl}>{service.title}</Link>
                    </h3>

                    <p>{service.description}</p>

                    <Link href={service.detailsUrl} className="default-btn">
                      {service.linkText} <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
