"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutContent = () => {
  return (
    <>
      <div className="about-area pt-100">
        <div className="container">
          <div className="row m-0">
            <div className="col-lg-6 col-md-12 p-0">
              <div 
                className="about-img"
                style={{
                  backgroundImage: `url(/images/about/about2.jpg)`,
                }}
              >
                <Image
                  src="/images/about/about2.jpg"
                  alt="image"
                  width={720}
                  height={866}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 p-0">
              <div className="about-text">
                <span className="sub-title">ABOUT ALL OF US</span>
                <h2>One of the Fastest Way to Gain Business Success</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy ant extra eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diammi maxil voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clitaiai
                  to ankasd gubergren, no sea takimata sanctus est Lorem ipsum
                  dolor sit amet. Adasta na lorem ipsum dolor sit amet.
                </p>

                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="single-about-box">
                      <div className="icon">
                        <i className="ri-star-line"></i>
                      </div>
                      <h3>Consistency</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="single-about-box">
                      <div className="icon">
                        <i className="ri-settings-2-line"></i>
                      </div>
                      <h3>Strategy</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="single-about-box">
                      <div className="icon">
                        <i className="ri-line-chart-line"></i>
                      </div>
                      <h3>Investment</h3>
                    </div>
                  </div>
                </div>

                <div className="about-btn">
                  <Link href="/about-modern" className="default-btn">
                    Read More <i className="ri-arrow-right-line"></i>
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

export default AboutContent;
