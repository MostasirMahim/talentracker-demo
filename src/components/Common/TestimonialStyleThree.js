"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    feedbckText:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod ut labore et dolore magna aliquyam erat, sed diammi maxil voluptua. At vero eos et accusam lores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsu adasta na. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    clientName: "Max Anderson",
    designation: "CEO, Switch Color Ltd.",
  },
  {
    id: 2,
    feedbckText:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod ut labore et dolore magna aliquyam erat, sed diammi maxil voluptua. At vero eos et accusam lores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsu adasta na. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    clientName: "Max Anderson",
    designation: "CEO, Switch Color Ltd.",
  },
  {
    id: 3,
    feedbckText:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod ut labore et dolore magna aliquyam erat, sed diammi maxil voluptua. At vero eos et accusam lores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsu adasta na. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    clientName: "Max Anderson",
    designation: "CEO, Switch Color Ltd.",
  },
];

const TestimonialStyleThree = () => {
  return (
    <>
      <div className="testimonial-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="testimonial-content">
                <span className="sub-title">TESTIMONIALS</span>
                <h2>
                  Lets Meet Up With Our All Of The Clients Says At A Glance
                </h2>

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
                      <SwiperSlide className="testimonial-desc" key={item.id}>
                        <div className="testimonial-desc">
                          <p>{item.feedbckText}</p>

                          <div className="info">
                            <h3>{item.clientName}</h3>
                            <span>{item.designation}</span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="testimonial-img">
                <Image
                  src="/images/man.jpg"
                  alt="image"
                  width={768}
                  height={725}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialStyleThree;
