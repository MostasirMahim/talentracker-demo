"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const chooseList = [
  {
    id: 1,
    icon: "ri-rocket-2-line",
    title: "Integrity",
    shortDes:
      "Integrity	We operate with honesty, confidentiality and fairness.",
  },
  {
    id: 2,
    icon: "ri-settings-2-line",
    title: "Compliance",
    shortDes:
      "Every service aligns with Bangladesh Labour Law & global standards.",
  },
  {
    id: 3,
    icon: "ri-bar-chart-horizontal-line",
    title: "People-First",
    shortDes:
      "People-First	We prioritize wellbeing, culture, and sustainable performance.",
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <div className="why-choose-us-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div 
                className="why-choose-us-image bg-image"
                style={{
                  backgroundImage: `url(/images/why-choose-us.jpg)`,
                }}
              >
                <Image
                  src="/images/why-choose-us.jpg"
                  alt="why-choose-us"
                  width={670}
                  height={718}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="why-choose-us-content">
                <span className="sub-title">REASON OF CHOOSE US</span>
                <h2>WHY CHOOSE <br/> <span>TALENTRACKER </span><br />
                   TO BUILD TRUST</h2>
                <p>
                  At TalenTracker Limited, we are your trusted one-stop HR business partner, delivering comprehensive solutions that go beyond recruitment to include training, payroll, legal consultancy, organizational development, and employee wellbeing. Our strength lies in combining strategic talent partnering, legal and compliance expertise, and psychology-driven people insights to help organizations build stronger teams and healthier workplaces.
                </p>

                <ul className="choose-list">
                  {chooseList &&
                    chooseList.map((list) => (
                      <li key={list.id}>
                        <i className={list.icon}></i>
                        <h3>{list.title}</h3>
                        <p>{list.shortDes}</p>
                      </li>
                    ))}
                </ul>

                <div className="read-more-btn">
                  <Link href="/about-us" className="default-btn">
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

export default WhyChooseUs;
