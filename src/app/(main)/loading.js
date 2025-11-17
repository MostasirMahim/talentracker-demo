import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Loader from "@/components/Loaders/Loader/Loader";
import React from "react";

function LoaderComponent() {
  return (
    <div>
      <NavbarStyleOne />
      <div style={{ width: "100%", height: "100vh" }}>
        <Loader />
      </div>
      <Footer />
    </div>
  );
}

export default LoaderComponent;
