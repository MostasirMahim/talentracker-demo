"use client";
  
import React from "react";
import Link from "next/link";
import ServicesOverview from "./ServicesOverview";

const services = [
  {
    id: 1,
    serviceIcon: "icon ri-group-2-line",
    serviceTitle: "Human Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetetur sadicinan elitr, sed diam nonumy eirmod tempor invidunt utis labore et dolore magna aliquyam erat, sed diamsan voluptua at vero.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 2,
    serviceIcon: "icon ri-briefcase-line",
    serviceTitle: "Solicitor Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetetur sadicinan elitr, sed diam nonumy eirmod tempor invidunt utis labore et dolore magna aliquyam erat, sed diamsan voluptua at vero.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 3,
    serviceIcon: "icon ri-money-dollar-box-line",
    serviceTitle: "Financial Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetetur sadicinan elitr, sed diam nonumy eirmod tempor invidunt utis labore et dolore magna aliquyam erat, sed diamsan voluptua at vero.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 4,
    serviceIcon: "icon ri-settings-2-line",
    serviceTitle: "Strategy Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetetur sadicinan elitr, sed diam nonumy eirmod tempor invidunt utis labore et dolore magna aliquyam erat, sed diamsan voluptua at vero.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 5,
    serviceIcon: "icon ri-restart-line",
    serviceTitle: "Tax Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetetur sadicinan elitr, sed diam nonumy eirmod tempor invidunt utis labore et dolore magna aliquyam erat, sed diamsan voluptua at vero.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
  {
    id: 6,
    serviceIcon: "icon ri-lightbulb-flash-line",
    serviceTitle: "Financial Consultancy",
    serviceShortDescription:
      "Lorem ipsum dolor sit amet, consetetur sadicinan elitr, sed diam nonumy eirmod tempor invidunt utis labore et dolore magna aliquyam erat, sed diamsan voluptua at vero.",
    readMoreText: "Read More",
    serviceDetailsUrl: "/services/details",
  },
];

const ServicesCard = () => {
  return (
    <>
      <div className="services-">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">SERVICES</span>
            <h2>See All of Our Services </h2>
          </div>

          <ServicesOverview />
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
