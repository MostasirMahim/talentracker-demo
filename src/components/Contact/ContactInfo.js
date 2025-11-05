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
                <h2>Contact Us With Your Details & Ready To Start</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod liquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea lorem ipsum dolor
                  sit amet, consetetur sadipscing elitr.
                </p>

                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-contact-info-box">
                      <div className="icon">
                        <i className="ri-home-7-line"></i>
                      </div>
                      <h3>Main Office</h3>
                      <p>325 Rockford Lane Durham, New York, USA</p>
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
                        <a href="mailto:+18144822296">+(1) 814 482 2296</a>
                      </p>
                      <p>
                        <span>Call:</span>
                        <a href="mailto:+54789632157">+(5) 478 963 2157</a>
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
                        <a href="mailto:hello@zixon.com">hello@zixon.com</a>
                      </p>
                      <p>
                        <span>Email:</span>
                        <a href="mailto:info@zixon.com">info@zixon.com</a>
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
