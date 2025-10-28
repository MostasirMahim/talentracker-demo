"use client";

import React from "react";
import Image from "next/image";

const FreeQuoteFormStyle2 = () => {
  return (
    <>
      <div className="free-quote-area bg-color">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="free-quote-content">
                <span className="sub-title">FREE QUOTE</span>
                <h2>Searching For An Expert Consultant From Us?</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="free-quote-form">
                <h3>GET A QUOTE</h3>
                <form>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Your Email</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Services</label>
                        <select className="form-select">
                          <option defaultValue="selected">
                            Financial Consultancy
                          </option>
                          <option>Strategy Consultancy</option>
                          <option>Organizational Consultancy</option>
                          <option>Tax Consultancy</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <button type="submit" className="default-btn">
                          Request A Quote{" "}
                          <i className="ri-arrow-right-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="shape3">
          <Image
            src="/images/shape/shape8.png"
            alt="image"
            width={257}
            height={344}
          />
        </div>
      </div>
    </>
  );
};

export default FreeQuoteFormStyle2;
