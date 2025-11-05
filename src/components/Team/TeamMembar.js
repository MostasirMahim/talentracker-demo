"use client";

import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    image: "/images/team/team1.jpg",
    altText: "James Andy",
    name: "James Andy",
    designation: "CEO & Founder",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 2,
    image: "/images/team/team2.jpg",
    altText: "Sarah Taylor",
    name: "Sarah Taylor",
    designation: "Office Manager",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 3,
    image: "/images/team/team3.jpg",
    altText: "Steven Smith",
    name: "Steven Smith",
    designation: "General Manager",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 4,
    image: "/images/team/team4.jpg",
    altText: "Alina Lucy",
    name: "Alina Lucy",
    designation: "PR and Consulting",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 5,
    image: "/images/team/team5.jpg",
    altText: "Robert Michael",
    name: "Robert Michael",
    designation: "Consulting",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 6,
    image: "/images/team/team6.jpg",
    altText: "Jennifer Linda",
    name: "Jennifer Linda",
    designation: "Consultant",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 7,
    image: "/images/team/team7.jpg",
    altText: "Richard Joseph",
    name: "Richard Joseph",
    designation: "Consultant",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    id: 8,
    image: "/images/team/team8.jpg",
    altText: "Jessica Karen",
    name: "Jessica Karen",
    designation: "Consultant",

    socialLinks: [
      {
        id: 1,
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/",
      },
      {
        id: 2,
        icon: "ri-twitter-fill",
        url: "https://twitter.com/",
      },
      {
        id: 3,
        icon: "ri-linkedin-fill",
        url: "https://www.linkedin.com/",
      },
      {
        id: 4,
        icon: "ri-instagram-line",
        url: "https://www.instagram.com/",
      },
    ],
  },
];

const TeamMembar = () => {
  return (
    <>
      <div className="team-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {teamMembers &&
              teamMembers.map((member) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={member.id}>
                  <div className="single-team-member">
                    <Image
                      src={member.image}
                      alt={member.altText}
                      width={660}
                      height={660}
                    />

                    <div className="content">
                      <h3>{member.name}</h3>
                      
                      <span>{member.designation}</span>

                      <ul className="social-links">
                        {member.socialLinks.map((link) => (
                          <li key={link.id}>
                            <a href={link.url} target="_blank">
                              <i className={link.icon}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
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

export default TeamMembar;
