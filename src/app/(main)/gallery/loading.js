import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import Loader from "@/components/Loaders/Loader/Loader";
import React from "react";

function Loading() {
  return (
    <div>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <div
        style={{
          width: "100%",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
      <Footer />
    </div>
  );
}

export default Loading;
