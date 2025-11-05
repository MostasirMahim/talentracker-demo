"use client";
  
import React from "react";

const TopHeaderStyleTwo = () => {
  return (
    <>
      <div className="top-header-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4">
              <div className="top-header-left-side">
                <div className="d-flex align-items-center">
                  <ul className="top-header-social-links d-flex align-items-center">
                    <li>Follow us on :</li>
                    <li>
                      <a href="https://www.facebook.com/talentracker/" target="_blank">
                        <i className="ri-facebook-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/company/talentracker-limited/" target="_blank">
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

            <div className="col-lg-8 col-md-8">
              <ul className="top-header-contact-info">
                <li>
                  <i className="ri-time-line"></i>
                   <span>Call No : </span> 
                    <a href="tel:+8801847293000" className="hover:underline">
                      +880 1847 293 000
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeaderStyleTwo;
