"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const chooseList = [
  {
    id: 1,
    icon: "ri-rocket-2-line",
    title: "Startup Facilities",
    shortDes:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra mpor invidunt ut labore et dolore magna aliquyam erat.",
  },
  {
    id: 2,
    icon: "ri-settings-2-line",
    title: "All Business Consulting Scope",
    shortDes:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra mpor invidunt ut labore et dolore magna aliquyam erat.",
  },
  {
    id: 3,
    icon: "ri-bar-chart-horizontal-line",
    title: "Financial & Investing Capacity",
    shortDes:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra mpor invidunt ut labore et dolore magna aliquyam erat.",
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <div className="why-choose-us-area pt-100">
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
                <h2>Reason of Choice Us From All of The Competitor in World</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy ant extra eirmod te mpor invidunt ut labore et
                  dolore magna aliquyam erat.
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
                  <Link href="/about-simple" className="default-btn">
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
