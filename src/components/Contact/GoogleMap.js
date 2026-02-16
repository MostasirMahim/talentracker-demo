"use client";

import React from "react";

const GoogleMap = () => {
  return (
    <>
      <div className="maps">
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d216.8420034832237!2d90.36656600289712!3d23.815942213274134!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f3cd97f1%3A0xf61907388a238e9c!2sTalenTracker%20Limited!5e1!3m2!1sen!2sbd!4v1763350957324!5m2!1sen!2sbd"></iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d645.2472469304993!2d90.36667228136606!3d23.816122871721785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f3cd97f1%3A0xf61907388a238e9c!2sTalenTracker%20Limited!5e0!3m2!1sen!2sbd!4v1766299327205!5m2!1sen!2sbd"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default GoogleMap;
