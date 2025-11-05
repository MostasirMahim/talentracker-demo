"use client";

import React from "react";
import Image from "next/image";

const history = [
  {
    id: 1,
    month: "March -",
    year: "2005",
    image: "/images/services/services1.jpg",
    altText: "History Image",
    title: "Zixon Founded",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diammi maxil. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    month: "June -",
    year: "2007",
    image: "/images/services/services2.jpg",
    altText: "History Image",
    title: "Texas Office Opened",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diammi maxil. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    month: "November -",
    year: "2011",
    image: "/images/services/services3.jpg",
    altText: "History Image",
    title: "Expansion to North America",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diammi maxil. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    month: "April -",
    year: "2020",
    image: "/images/services/services4.jpg",
    altText: "History Image",
    title: "Consulting Companies in 2020",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ant extra eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diammi maxil. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitaiai to ankasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
];

const CompanyHistoryContent = () => {
  return (
    <>
      <div className="company-history-area ptb-100">
        <div className="container">
          <div className="section-title">
            <h2>Excellence In Business More Than 20 Years</h2>
          </div>

          <div className="company-history-content">
            <ul className="timeline">
              {history &&
                history.map((item) => (
                  <li className="timeline-item" key={item.id}>
                    <div className="timeline-info">
                      <span className="sub-title">
                        {item.month} <span>{item.year}</span>
                      </span>
                    </div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 image">
                          <Image
                            src={item.image}
                            alt={item.altText}
                            width={860}
                            height={622}
                          />
                        </div>

                        <div className="col-lg-6 col-md-6 content">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyHistoryContent;
