"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosIntance";

const FreeQuoteFormStyle2 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestQuote = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !service) {
      toast.info("Please fill all the fields");
      return;
    }
    if (service == "" || service == "None") {
      toast.info("Please select a service");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      service,
    };

    if (designation.trim()) {
      payload.designation = designation;
    }
    if (message.trim()) {
      payload.message = message;
    }

    const response = await axiosInstance.post(
      "/api/quotes/v1/quotes/",
      payload
    );
    if (response.status == 201) {
      toast.success("Request sent successfully");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setDesignation("");
      setMessage("");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="free-quote-area bg-color">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="free-quote-content">
                <span className="sub-title">FREE QUOTE</span>
                <h2>
                  Looking for a Trusted HR Partner to Empower Your People?
                </h2>
                <p>
                  At TalenTracker Limited, we connect strategy, people, and
                  performance to help businesses grow stronger. Whether you need
                  expert support in recruitment, HR consultancy, legal
                  compliance, training, or employee wellbeing, our team is ready
                  to deliver tailor-made solutions that truly make a difference.
                </p>
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="free-quote-form">
                <h3>GET A QUOTE</h3>
                <form onSubmit={handleRequestQuote}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Your Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Your Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Your Phone <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>
                          Services <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) => setService(e.target.value)}
                          value={service}
                        >
                          <option value="None">Strategy Consultancy</option>
                          <option>Executive Search & Head Hunting</option>
                          <option>Career Counselling & Placement</option>
                          <option>Pre-Employment Screening</option>
                          <option>HR & Management Consultancy</option>
                          <option>
                            Organization Culture & Change Management
                          </option>
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
                        <label>Designation</label>
                        <input
                          type="text"
                          className="form-control"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Message</label>
                        <input
                          type="text"
                          className="form-control"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <button type="submit" className="default-btn">
                          Request A Quote
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
