import Loader from "@/components/Loaders/Loader/Loader";
import React from "react";

function LoaderComponent() {
  return (
    <div>
      <div style={{ width: "100%", height: "100vh" }}>
        <Loader />
      </div>
    </div>
  );
}

export default LoaderComponent;
