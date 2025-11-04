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
               <h2>Looking for a Trusted HR Partner to Empower Your People?</h2>
                <p>
                  At TalenTracker Limited, we connect strategy, people, and performance to help businesses grow stronger. Whether you need expert support in recruitment, HR consultancy, legal compliance, training, or employee wellbeing, our team is ready to deliver tailor-made solutions that truly make a difference.
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
                        <label>Your Phone</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>


                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Services</label>
                        <select className="form-select">
                          <option value="selected">
                            Strategy Consultancy
                          </option>
                          <option>Executive Search & Head Hunting</option>
                          <option>Career Counselling & Placement</option>
                          <option>Pre-Employment Screening</option>
                          <option>HR & Management Consultancy</option>
                          <option>Organization Culture & Change Management</option>
                          <option>Employee Wellness & Mental Health</option>
                          <option>Remote & Contract Staffing</option>
                          <option>Employer of Record (EOR) & PEO</option>
                          <option>Payroll Management</option>
                          <option>BIDA/BEGA/Investment Advisory</option>
                          <option>Tailored Training Solutions</option>
                          <option>Labour Law Compliance Audit</option>
                          <option>Regulatory Affairs Consultancy</option>
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
