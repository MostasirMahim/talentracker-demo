"use client";
import { useRouter } from "next/navigation";
import React from "react";

function PasswordResetSuccess() {
  const router = useRouter();
  return (
    <>
      <style>{`
        .verify-wrapper {
          max-width: 450px;
          margin: 20px auto;
          padding: 30px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .verify-title {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .verify-text {
          font-size: 15px;
          color: #555;
          margin-bottom: 25px;
        }

        .verify-btns {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .verify-btn {
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          transition: 0.3s;
        }

        .employer-btn {
          background: #0e4c89;
          color: white;
        }
        .employer-btn:hover {
          background: #1489bc;
        }

        .user-btn {
          background: #1489bc;
          color: white;
        }
        .user-btn:hover {
          background: #0e4c89;
        }
      `}</style>

      <div className="verify-wrapper">
        <div className="verify-title">🎉 Password Updated!</div>
        <p className="verify-text">
          Your password has been successfully reset. You can now log in with your new password.
        </p>

        <div className="verify-btns">
          <button className="verify-btn employer-btn" onClick={()=> router.push("/auth/employer/login")}>Employer</button>
          <button className="verify-btn user-btn" onClick={()=> router.push("/auth/user/login")}>User</button>
        </div>
      </div>
    </>
  );
}

export default PasswordResetSuccess;
