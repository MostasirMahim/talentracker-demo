"use client";

import React from "react";
import GoogleMap from "@/components/Contact/GoogleMap";
import Link from "next/link";

const ContactForm = () => {
  return (
    <>
      <div className="contact-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <GoogleMap />
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="contact-form">
                <span className="sub-title">SEND MESSAGE</span>
                <h2>Lets Provide Us a Message & Contact Us</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy liquyam erat, sed diam voluptua. At vero eos et
                  accusam et justo duo dolo lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr.
                </p>

                <form>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="number"
                          placeholder="Phone number"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <textarea
                          name="text"
                          cols="30"
                          rows="6"
                          placeholder="Write your message..."
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="checkme"
                        />
                        <label className="form-check-label" htmlFor="checkme">
                          Accept{" "}
                          <Link href="/terms-conditions">
                            Terms of Services
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy-policy">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" className="default-btn">
                        Send Message <i className="ri-arrow-right-line"></i>
                      </button>
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

export default ContactForm;
