"use client";

import React, { useState } from "react";
import PopupForm from "../FreeQuoteForm/PopupForm";
import { Send } from "lucide-react";

function FloatingForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Floating Icon Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn btn-primary shadow d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          left: "24px",
          bottom: "24px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          zIndex: 1050,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "bounce 2s infinite",
          cursor: "pointer",
          backgroundColor: "#1489bc",
        }}
        title="Request service"
      >
        <Send size={24} />
      </button>

      {/* Popup Form */}
      {showForm && <PopupForm onClose={() => setShowForm(false)} />}

      {/* Bounce Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </>
  );
}

export default FloatingForm;
