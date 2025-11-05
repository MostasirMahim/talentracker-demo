"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const SeeWhatWeDoTwo = () => {
  return (
    <>
      <div className="what-we-do-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="what-we-do-text">
                <span className="sub-title">SEE WHAT WE DO</span>
                <h2>Information is the Main Point to Success on Business</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy ant extra eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diammi maxil voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clitaiai
                  to ankasd gubergren, no sea takimata sanctus est Lorem ipsum
                  dolor sit amet. Adasta na lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr.
                </p>

                <Link href="/contact" className="default-btn">
                  Contact Us <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="what-we-do-img">
                <Image
                  src="/images/what-we-do/what-we-do2.jpg"
                  alt="image"
                  width={720}
                  height={720}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeWhatWeDoTwo;
