// Footer.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GoogleMap from "../Contact/GoogleMap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="row justify-content-center">
            {/* First Column: Logo, Company Name, Map */}
            <div className="col-lg-4 col-sm-8 col-md-8">
              <div className="single-footer-widget">
                <Link href="/" className="logo">
                  <Image
                    src="/images/logos/logo_white.png"
                    alt="TalenTracker Logo"
                    width={300}
                    height={50}
                  />
                </Link>
                {/* Repositioned Company Name */}
                <p className="company-tagline">TalenTracker Limited.</p>

                <div className="footer-contact-info footer-map-snippet">
                  <h5>Google Map:</h5>
                  <div className="map-wrapper">
                    <GoogleMap />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Column: Quick Links */}
            <div className="col-lg-4 col-sm-8 col-md-8">
              <div className="single-footer-widget pl-4">
                <h3>Quick Links</h3>
                <ul className="links-list">
                  <li>
                    <Link href="/services">All Services</Link>
                  </li>
                  <li>
                    <Link href="/career">Available Jobs</Link>
                  </li>
                  <li>
                    <Link href="/training-solutions">Training Solutions</Link>
                  </li>
                  <li>
                    <Link href="/news">News</Link>
                  </li>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/blog">Latest Articles</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Third Column: Reach Out */}
            <div className="col-lg-4 col-sm-8 col-md-8">
              <div className="single-footer-widget pl-2">
                <h3>Reach Out</h3>
                <div className="footer-contact-info">
                  <ul>
                    <li>
                      <span>Call :</span>{" "}
                      <a href="tel:+8801847293000">+880 184 7293 000</a>
                    </li>
                    <li>
                      <span>Email :</span>{" "}
                      <a href="mailto:care@talentracker.net">
                        care@talentracker.net
                      </a>
                    </li>
                    {/* *** CHANGE HERE: Removed className="location-li" *** */}
                    <li>
                      <span>Location :</span>{" "}
                      <a>
                        House 1(Level 2), Road 3, Block A, Mirpur 11, Begum
                        Rokeya Avenue, Dhaka-1216.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="copyright-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-7 col-sm-6">
                <p>
                  &copy; {currentYear} TalenTracker Limited. All Rights
                  Reserved.
                </p>
              </div>

              <div className="col-lg-6 col-md-5 col-sm-6">
                <ul className="social-links">
                  <li>
                    <a
                      href="https://www.facebook.com/talentracker/"
                      target="_blank"
                    >
                      <i className="ri-facebook-fill"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/talentracker-limited/"
                      target="_blank"
                    >
                      <i className="ri-linkedin-fill"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/talen_tracker?igsh=NXN2NWY3d2E1a3B4"
                      target="_blank"
                    >
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
