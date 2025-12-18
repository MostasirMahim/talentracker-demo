"use client";
import React, { useState } from "react";
import PopupForm from "../FreeQuoteForm/PopupForm";

function ServiceQuoteButton() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="read-more-btn" onClick={() => setShowForm(!showForm)}>
        <div className="default-btn" style={{cursor:"pointer"}}>
          Request For a Service Now <i className="ri-arrow-right-line"></i>
        </div>
      </div>
      {showForm && <PopupForm onClose={() => setShowForm(false)} />}
    </>
  );
}

export default ServiceQuoteButton;
