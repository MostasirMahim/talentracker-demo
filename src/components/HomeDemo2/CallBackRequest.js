"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CallBackRequest = () => {
  return (
    <>
      <div className="call-back-request-area ptb-100">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="call-back-request-content">
                <span className="sub-title">CALL BACK REQUEST</span>
                <h2>Help You Reach Business of Your in Right Goal</h2>

                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy a eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At verorh eos et accusam at
                  vero eos et accusam.
                </p>

                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="single-call-back-box">
                      <div className="icon">
                        <i className="ri-checkbox-multiple-line"></i>
                      </div>
                      <h3>Projects Completions</h3>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="single-call-back-box">
                      <div className="icon">
                        <i className="ri-pie-chart-2-line"></i>
                      </div>
                      <h3>Case Study Competitions</h3>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="single-call-back-box">
                      <div className="icon">
                        <i className="ri-medal-line"></i>
                      </div>
                      <h3>Excellent Awards Wins</h3>
                    </div>
                  </div>
                </div>

                <div className="request-btn">
                  <Link href="/contact" className="default-btn">
                    Request A Call <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="call-back-request-image">
                <Image
                  src="/images/call-back-request.png"
                  alt="image"
                  width={969}
                  height={920}
                />

                <Image
                  src="/images/shape/shape9.png"
                  className="shape4"
                  alt="image"
                  width={313}
                  height={360}
                />
                <Image
                  src="/images/shape/shape10.png"
                  className="shape5"
                  alt="image"
                  width={313}
                  height={360}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallBackRequest;
