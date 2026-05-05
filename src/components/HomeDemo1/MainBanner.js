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
          <div
            className="single-banner-item"
            style={{
              backgroundImage: `url(/images/new_banner_images/banner1.jpeg)`,
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
    </>
  );
};

export default MainBanner;
