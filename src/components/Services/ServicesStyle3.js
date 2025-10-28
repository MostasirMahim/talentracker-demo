"use client";
  
import React from "react";
import Link from "next/link";

const services = [
  {
    id: 1,
    serviceIcon: "ri-group-2-line",
    serviceTitle: "Human Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 2,
    serviceIcon: "ri-briefcase-line",
    serviceTitle: "Solicitor Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 3,
    serviceIcon: "ri-money-dollar-box-line",
    serviceTitle: "Financial Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 4,
    serviceIcon: "ri-settings-2-line",
    serviceTitle: "Strategy Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 5,
    serviceIcon: "ri-restart-line",
    serviceTitle: "Tax Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 6,
    serviceIcon: "ri-lightbulb-flash-line",
    serviceTitle: "Financial Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 7,
    serviceIcon: "ri-stack-line",
    serviceTitle: "Solicitor Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 8,
    serviceIcon: "ri-registered-fill",
    serviceTitle: "HR Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 9,
    serviceIcon: "ri-checkbox-multiple-line",
    serviceTitle: "Start Ups",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetet elitr, sed diam nonumy eiod temp labore et dolore magna.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
];

const ServicesStyle3 = () => {
  return (
    <>
      <div className="services-area ptb-100">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">SERVICES</span>
            <h2>All The Services That We Provide to Our Clients</h2>
          </div>

          <div className="row align-items-center">
            {services &&
              services.map((service) => (
                <div className="col-lg-4 col-sm-6 col-md-6" key={service.id}>
                  <div className="single-services-item border">
                    <div className="icon">
                      <i className={service.serviceIcon}></i>
                    </div>
                    <h3>
                      <Link href={service.serviceDetailsUrl}>
                        {service.serviceTitle}
                      </Link>
                    </h3>

                    <p>{service.serviceShortDescription}</p>

                    <Link href={service.serviceDetailsUrl} className="link-btn">
                      {service.readMoreText}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesStyle3;
