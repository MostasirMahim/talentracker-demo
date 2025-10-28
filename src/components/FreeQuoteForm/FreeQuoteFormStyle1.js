"use client";

import React from "react";
import Image from "next/image";

const FreeQuoteFormStyle1 = () => {
  return (
    <>
      <div className="free-quote-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="free-quote-image">
                <Image
                  src="/images/free-quote.jpg"
                  alt="image"
                  width={720}
                  height={680}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="free-quote-text">
                <span className="sub-title">FREE QUOTE</span>
                <h2>Search and Expert Any Time From Just Knock Us</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy ant extra eirmod te mpor invidunt ut labore et
                  dolore magna aliquyam erat. Te mpor invidunt utttfg labore et
                  dolore magna aliquyam erat
                </p>

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
                          <option value="selected">
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
      </div>
    </>
  );
};

export default FreeQuoteFormStyle1;
