"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const serviceCard = [
  {
    id: 1,
    image: "/images/services/services1.jpg",
    altText: "Service Image",
    title: "Financial Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 2,
    image: "/images/services/services2.jpg",
    altText: "Service Image",
    title: "Strategy Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 3,
    image: "/images/services/services4.jpg",
    altText: "Service Image",
    title: "Organizational Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 4,
    image: "/images/services/services4.jpg",
    altText: "Service Image",
    title: "Tax Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 6,
    image: "/images/services/services6.jpg",
    altText: "Service Image",
    title: "Marketing Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
  {
    id: 7,
    image: "/images/services/services7.jpg",
    altText: "Service Image",
    title: "Startup Consultancy",
    description:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut",
    linkText: "Read More",
    detailsUrl: "/services/details",
  },
];

const ServicesStyle1 = () => {
  return (
    <>
      <div className="services-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            {serviceCard &&
              serviceCard.map((service) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={service.id}>
                  <div className="single-services-box">
                    <div className="image">
                      <Link href={service.detailsUrl}>
                        <Image
                          src={service.image}
                          alt={service.altText}
                          width={860}
                          height={622}
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h3>
                        <Link href={service.detailsUrl}>{service.title}</Link>
                      </h3>

                      <p>{service.description}</p>

                      <Link href={service.detailsUrl} className="default-btn">
                        {service.linkText}{" "}
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesStyle1;
