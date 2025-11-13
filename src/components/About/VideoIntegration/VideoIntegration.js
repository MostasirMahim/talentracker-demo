import React from "react";

function VideoIntegration() {
  return (
    <div>
      {" "}
      <div className="container text-center">
        <h2 className="fw-bold text-primary mb-4">See us visually</h2>
        <div className="mb-4">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/FKp5ebP-7D4?si=oBO-kPXzsjqALbxp"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoIntegration;
