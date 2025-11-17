"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <>
      <div className="coming-soon-area">
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="col-lg-6 col-md-12 p-0">
              <div className="coming-soon-content">
                <div className="d-table">
                  <div className="d-table-cell">
                    <Link href="/" className="logo">
                      <Image
                        src="/images/talent_logo.png"
                        alt="image"
                        width={147}
                        height={33}
                      />
                    </Link>

                    <h2>This feature is coming soon!</h2>
                    <Link href={"/"}>
                      <button className="btn btn-primary mt-2">
                        Back to home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 p-0">
              <div
                className="coming-soon-image"
                style={{
                  backgroundImage: `url(/images/coming-soon.jpg)`,
                }}
              >
                <Image
                  src="/images/coming-soon.jpg"
                  alt="image"
                  width={1000}
                  height={1100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
