"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";

const MainBanner = () => {
  return (
    <>
      <Swiper
        navigation={true}
        grabCursor={true}
        effect={"fade"}
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        modules={[EffectFade, Navigation, Autoplay]}
        speed={1000}
        className="home-slides"
      >
        <SwiperSlide>
          <div
            className="single-banner-item"
            style={{
              backgroundImage: `url(/images/new_banner_images/slide_1.png)`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">
                      PARTNER MORDERN HR SOLUTION
                    </span>
                    <h1>Right People Right Fit</h1>
                    <div className="btn-box">
                      <Link href="/contact" className="default-btn">
                        Employer <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link href="/career" className="default-btn">
                        Applicant <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="single-banner-item"
            style={{
              backgroundImage: `url(/images/new_banner_images/slide_3.png)`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">
                      GROW YOUR BUSINESS WITH US
                    </span>
                    <h1>Start Excellence Here</h1>
                    <div className="btn-box">
                      <Link href="/contact" className="default-btn">
                        Employer <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link href="/career" className="default-btn">
                        Applicant <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="single-banner-item"
            style={{
              backgroundImage: `url(/images/new_banner_images/slide_3.png)`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">
                      MAKE YOUR VISION TO REALITY
                    </span>
                    <h1>Elevate Your Business with Our Tailored HR Solution</h1>
                    <div className="btn-box">
                      <Link href="/contact" className="default-btn">
                        Employer <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link href="/career" className="default-btn">
                        Applicant<i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainBanner;
