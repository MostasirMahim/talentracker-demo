"use client";

import React from "react";

function PopupForm({ onClose }) {
  return (
    <div
      className="p-4 shadow-lg free-quote-form-popover"
      style={{
        position: "fixed",
        left: "24px",
        bottom: "80px",
        width: "90%",
        maxWidth: "450px",
        zIndex: 1040,
     
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 px-4">GET A QUOTE</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <form >
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Your Name</label>
            <input type="text" className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Your Email</label>
            <input type="text" className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Your Phone</label>
            <input type="text" className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Services</label>
            <select className="form-select">
              <option value="selected">Strategy Consultancy</option>
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

         
            <div className="form-group d-flex justify-content-center align-items-center col-12">
              <button type="submit" className="default-btn">
                Request A Quote <i className="ri-arrow-right-line"></i>
              </button>
            </div>
         
        </div>
      </form>
    </div>
  );
}

export default PopupForm;
