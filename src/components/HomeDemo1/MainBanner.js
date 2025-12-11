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
          delay: 2000,
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
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              maxHeight: "600px",
              height: "100%",
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">RIGHT PEOPLE RIGHT FIT</span>
                    <h1>Partner Modern HR Solutions</h1>
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

                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-image">
                    <Image
                      src="/images/banner_images/slide1.png"
                      alt="image"
                      width={655}
                      height={810}
                    />
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
              backgroundImage: `url(/images/new_banner_images/slide_2.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              maxHeight: "600px",
              height: "100%",
            }}
          >
            <div className="container">
              <div className="row align-items-center">
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

                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-image">
                    <Image
                      src="/images/banner_images/slide2.png"
                      alt="image"
                      width={655}
                      height={810}
                    />
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
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              maxHeight: "600px",
              height: "100%",
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
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

                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-image">
                    <Image
                      src="/images/banner_images/slide3.png"
                      alt="image"
                      width={655}
                      height={810}
                    />
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
