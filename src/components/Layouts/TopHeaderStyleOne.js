"use client";
  
import React from "react";

const TopHeaderStyleOne = () => {
  return (
    <>
      <div className="top-header-area">
        <div className="container-fluid">
          <div className="top-header-inner">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4">
                <div className="top-header-left-side">
                  <div className="d-flex align-items-center">
                    <ul className="top-header-social-links d-flex align-items-center">
                      <li>Follow us:</li>
                      <li>
                        <a href="https://www.facebook.com/" target="_blank">
                          <i className="ri-facebook-fill"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/" target="_blank">
                          <i className="ri-twitter-fill"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/" target="_blank">
                          <i className="ri-linkedin-fill"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/" target="_blank">
                          <i className="ri-instagram-line"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-8">
                <ul className="top-header-contact-info">
                  <li>
                    <i className="ri-time-line"></i>
                    <span>SUN - THU:</span> 8:00 AM - 9:00 PM
                  </li>
                  <li>
                    <i className="ri-map-pin-2-line"></i>
                    <span>OFFICE:</span> 1847 Morris Street, Texas
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeaderStyleOne;
