"use client";

import React, { useState } from "react";
import GoogleMap from "@/components/Contact/GoogleMap";
import { MessageSquareMore } from "lucide-react";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      full_name,
      email,
      phone_number,
      subject,
      company,
      message,
    };
    if (company == "") {
      delete data.company;
    }

    try {
      const response = await axiosInstance.post(
        "/api/contacts/v1/contacts/",
        data
      );
      if (response.status == 201) {
        toast.success("Message sent successfully");
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setSubject("");
        setCompany("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

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
                <h2>
                  Send us a message <MessageSquareMore />{" "}
                </h2>
                <p>
                  For sending us message please fill up required information and
                  click send. We will get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="form-control"
                          required
                          value={full_name}
                          onChange={(e) => setFullName(e.target.value)}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          value={phone_number}
                          onChange={(e) => setPhoneNumber(e.target.value)}
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
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="company"
                          placeholder="Company"
                          className="form-control"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          cols="30"
                          rows="6"
                          placeholder="Write your message..."
                          className="form-control"
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
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
