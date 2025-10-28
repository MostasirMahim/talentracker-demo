"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutContent = () => {
  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div 
                className="about-image bg-image"
                style={{
                  backgroundImage: `url(/images/about/about3.jpg)`
                }}
              >
                <Image
                  src="/images/about/about3.jpg"
                  alt="image"
                  width={755}
                  height={829}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="about-content">
                <span className="sub-title">ABOUT ALL OF US</span>
                <h2>What Will You Get From Our Dedicated Company</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy ant extra eirmo tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diammi maxil voluptua. At ve
                  ro eos et accusam et justo duo dolores et ea rebum.
                </p>

                <ul className="features-list">
                  <li>
                    <div className="number">01</div>
                    <h3>Consistency</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy ant extra mpor invidunt ut labore et
                      dolore magna aliquyam erat.
                    </p>
                  </li>
                  <li>
                    <div className="number">02</div>
                    <h3>Strategy</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy ant extra mpor invidunt ut labore et
                      dolore magna aliquyam erat.
                    </p>
                  </li>
                  <li>
                    <div className="number">03</div>
                    <h3>Investment</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy ant extra mpor invidunt ut labore et
                      dolore magna aliquyam erat.
                    </p>
                  </li>
                </ul>

                <div className="read-more-btn">
                  <Link href="/about-simple" className="default-btn">
                    Read More
                    <i className="ri-arrow-right-line"></i>
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
