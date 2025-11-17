"use client";

import React from "react";
import Image from "next/image";

const ContactInfo = () => {
  return (
    <>
      <div className="pt-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="contact-content">
                <span className="sub-title">CONTACT US</span>
                <h2>Contact Us </h2>
                <p>Connect with our experts to build a better workplace.</p>

                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-contact-info-box">
                      <div className="icon">
                        <i className="ri-home-7-line"></i>
                      </div>
                      <h3>Main Office</h3>
                      <p>
                        House 1(Level 2), Road 3, Block A, Mirpur 11, Begum
                        Rokeya Avenue, Dhaka-1216
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-contact-info-box">
                      <div className="icon">
                        <i className="ri-phone-line"></i>
                      </div>
                      <h3>Our Phone</h3>
                      <p>
                        <span>Call:</span>
                        <a href="tel:+8801847293000">+880 184 7293 000</a>
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-contact-info-box">
                      <div className="icon">
                        <i className="ri-mail-star-line"></i>
                      </div>
                      <h3>Email Address</h3>
                      <p>
                        <span>Email:</span>
                        <a href="mailto:care@talentracker.net">
                          care@talentracker.net
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="contact-image">
                <Image
                  src="/images/contact.png"
                  alt="image"
                  width={750}
                  height={670}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
