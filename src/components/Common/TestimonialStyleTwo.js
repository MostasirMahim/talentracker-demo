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
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod ut labore et dolore magna aliquyam erat, sed diammi maxil voluptua. At vero eos et accusam lores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsu adasta na. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    clientName: "Max Anderson",
    designation: "CEO, Switch Color Ltd.",
    image: "/images/testimonial/testimonial1.jpg",
    altText: "Max Anderson",
  },
  {
    id: 2,
    quotesIcon: "ri-double-quotes-l",
    feedbckText:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod ut labore et dolore magna aliquyam erat, sed diammi maxil voluptua. At vero eos et accusam lores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsu adasta na. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    clientName: "Max Anderson",
    designation: "CEO, Switch Color Ltd.",
    image: "/images/testimonial/testimonial2.jpg",
    altText: "Max Anderson",
  },
  {
    id: 3,
    quotesIcon: "ri-double-quotes-l",
    feedbckText:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod ut labore et dolore magna aliquyam erat, sed diammi maxil voluptua. At vero eos et accusam lores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsu adasta na. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    clientName: "Max Anderson",
    designation: "CEO, Switch Color Ltd.",
    image: "/images/testimonial/testimonial3.jpg",
    altText: "Max Anderson",
  },
];

const TestimonialStyleTwo = () => {
  return (
    <>
      <div className="testimonial-area ptb-100 bg-fafafa">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">TESTIMONIALS</span>
            <h2>What Our Clients Say</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore.
            </p>
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

export default TestimonialStyleTwo;
