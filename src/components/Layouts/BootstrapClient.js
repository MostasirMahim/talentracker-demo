"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import React from "react";

function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}

export default BootstrapClient;
