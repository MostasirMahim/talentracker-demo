"use client";

import React from "react";
import Image from "next/image";
import { Expand, Scale, Handshake, Speech, UsersRound } from "lucide-react";

const AboutContentTwo = () => {
  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div
                className="about-image bg-image"
                style={{
                  backgroundImage: `url(/images/about/core_values.webp)`,
                }}
              >
                <Image
                  src="/images/about/core_values.webp"
                  alt="image"
                  width={755}
                  height={829}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="about-content">
                <span className="h3">Core Values</span>
                <ul className="features-list">
                  <li>
                    <div className="number">
                      <Expand />
                    </div>
                    <h3>Integrity</h3>
                    <p>We operate with honesty, confidentiality and fairness</p>
                  </li>
                  <li>
                    <div className="number">
                      <Scale />
                    </div>
                    <h3>Compliance</h3>
                    <p>
                      Every service aligns with Bangladesh Labour Law & global
                      standards.
                    </p>
                  </li>
                  <li>
                    <div className="number">
                      <Handshake />
                    </div>
                    <h3>Partnership</h3>
                    <p>
                      We work as a strategic HR ally, not just a service
                      provider.
                    </p>
                  </li>
                  <li>
                    <div className="number">
                      <Speech />
                    </div>
                    <h3>Agility</h3>
                    <p>
                      Tailored, flexible HR solutions designed around client
                      needs.
                    </p>
                  </li>
                  <li>
                    <div className="number">
                      <UsersRound />
                    </div>
                    <h3>People-First </h3>
                    <p>
                      We prioritize wellbeing, culture, and sustainable
                      performance
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContentTwo;
