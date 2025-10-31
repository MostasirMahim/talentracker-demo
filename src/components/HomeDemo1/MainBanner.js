"use client"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Autoplay } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import "swiper/css/effect-fade"

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
              backgroundImage: `url(/images/banner/banner-bg2.jpg)`,
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">WELCOME TO US</span>
                    <h1>Business Consultant & Grid Line For You</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam intaas nonumy eirmod tempor
                      invidunt ut labore et.
                    </p>

                    <div className="btn-box">
                      <Link href="/contact" className="default-btn">
                        Contact Us <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link href="/contact" className="default-btn">
                        Get Started <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-image">
                    <Image src="/images/banner/banner2.png" alt="image" width={655} height={810} />
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
              backgroundImage: `url(/images/banner/banner-bg3.jpg)`,
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">ABOUT ALL OF US</span>
                    <h1>Take Our Help To Reach The Top</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam intaas nonumy eirmod tempor
                      invidunt ut labore et.
                    </p>

                    <div className="btn-box">
                      <Link href="/contact" className="default-btn">
                        Contact Us <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link href="/contact" className="default-btn">
                        Get Started <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-image">
                    <Image src="/images/banner/banner3.png" alt="image" width={655} height={810} />
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
              backgroundImage: `url(/images/banner/banner-bg3.jpg)`,
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-content">
                    <span className="sub-title">REASON OF CHOOSE US</span>
                    <h1>Transform & Build Your Own Business</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam intaas nonumy eirmod tempor
                      invidunt ut labore et.
                    </p>

                    <div className="btn-box">
                      <Link href="/contact" className="default-btn">
                        Contact Us <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link href="/contact" className="default-btn">
                        Get Started <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="banner-item-image">
                    <Image src="/images/banner/banner4.png" alt="image" width={655} height={810} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default MainBanner
