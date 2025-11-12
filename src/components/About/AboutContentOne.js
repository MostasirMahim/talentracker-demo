"use client";

import React from "react";
import Image from "next/image";

const AboutContentOne = () => {
  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="about-image">
                <Image
                  src="/images/about/about1.png"
                  alt="image"
                  width={750}
                  height={728}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="about-content">
                <span className="sub-title">ABOUT US</span>
                <p>
                  <span className="h3">TalenTracker Limited</span> is a HR
                  solutions provider specializing in Talent Acquisition, HR
                  Outsourcing, Global Mobility and People & Culture
                  transformation. We support local and multinational companies
                  operating in Bangladesh with compliant, scalable and
                  industry-ready HR services aligned with Bangladesh Labour Law
                  and international best practices. With a strong understanding
                  of the Bangladesh talent landscape, including expatriate
                  onboarding, employer of record (EOR/PEO), payroll management,
                  and labour compliance; we help organizations reduce
                  operational complexity and focus on growth. <br /> Our
                  approach combines strategic HR consulting with handson
                  execution, ensuring both speed and quality in delivering
                  talent and HR operations. From executive search to culture
                  change, from global hiring to remote staffing, and from HR
                  governance to employee wellbeing — TalenTracker partners with
                  organizations to build future-ready workforces built on trust,
                  compliance, and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContentOne;
