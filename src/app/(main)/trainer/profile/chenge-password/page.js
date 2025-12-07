import ChengePassword from "@/components/Candidate/chenge_password/ChengePassword";
import React from "react";

function page() {
  return (
    <div className="d-flex justify-content-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h5 className="text-left mb-4">Change Your Password</h5>
        <ChengePassword />
      </div>
    </div>
  );
}

export default page;
