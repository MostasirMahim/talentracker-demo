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
