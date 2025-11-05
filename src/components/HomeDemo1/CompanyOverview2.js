"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CompanyOverview2 = () => {
  return (
    <>
      <div className="what-we-do-area ptb-70">
        <div className="container">
          <div className="row align-items-center">
            {/* Image Column */}
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
              <div className="what-we-do-img">
                <Image
                  src="/images/about/office.jpg"
                  alt="image"
                  width={720}
                  height={720}
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="col-lg-6 col-md-12 order-1 order-lg-2">
              <div className="what-we-do-text">
                <span className="sub-title">COMPANY OVERVIEW</span>
                <div className="section-overview-title">
                  <h2>TalenTracker Limited</h2>
                  <h4>RIGHT PEOPLE, RIGHT FIT</h4>
                  <p>
                    TalenTracker is a strategic HR and talent solutions partner
                    helping organizations hire smarter, operate compliantly, and
                    build high-performing teams. We deliver end-to-end workforce
                    solutions including Executive Search, RPO, Payroll, EOR/PEO,
                    and HR Consultancy for both local and multinational
                    businesses.
                  </p>
                </div>

                <Link href="/about-us/" className="default-btn">
                  ABOUT US <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyOverview2;
