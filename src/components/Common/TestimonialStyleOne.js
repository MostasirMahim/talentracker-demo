"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quotesIcon: "ri-double-quotes-l",
    feedbckText:
      "TalenTracker Limited has completely transformed our recruitment process. Their team has an exceptional ability to find the right talent that fits our company culture perfectly. Their commitment to excellence and professional approach is truly impressive.-dummy",
    clientName: "Rahat Chowdhury",
    designation: "HR Director, Apex Group",
    image: "/images/testimonial/testimonial1.jpg",
    altText: "Rahat Chowdhury",
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

const TestimonialStyleOne = () => {
  return (
    <>
      <div className="testimonial-area ptb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">TESTIMONIALS</span>
            <h2>Let&apos;s Meet With Our Client Says</h2>
          </div>

          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="testimonial-slides"
          >
            {testimonials &&
              testimonials.map((item) => (
                <SwiperSlide className="single-testimonial-box" key={item.id}>
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-md-8">
                      <div className="testimonial-desc">
                        <i className={item.quotesIcon}></i>
                        <p>{item.feedbckText}</p>
                        <div className="info">
                          <h3>{item.clientName}</h3>
                          <span>{item.designation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <div className="testimonial-image">
                        <Image
                          src={item.image}
                          alt={item.altText}
                          width={600}
                          height={544}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TestimonialStyleOne;
