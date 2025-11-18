"use client";

import { useState } from "react";
import "./style.css";

export function AlertModal({
  isOpen,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal-content">
        <h2 className="alert-modal-title">Apply Job</h2>
        <p className="alert-modal-message">Are you sure want to apply this job?</p>
        <div className="alert-modal-buttons">
          <button className="alert-modal-button cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="alert-modal-button confirm-btn"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
