"use client";

import React from "react";
import CountUp from "react-countup";

const funfact = [
  {
    id: 1,
    icon: "ri-file-copy-2-line",
    number: "40",
    sign: "K+",
    title: "Screened Resume",
  },
  {
    id: 2,
    icon: "ri-book-open-line",
    number: "10",
    sign: "K",
    title: "Access Profiles",
  },
  {
    id: 3,
    icon: "ri-team-fill",
    number: "500",
    sign: "+",
    title: "Trained Employee",
  },
  {
    id: 4,
    icon: "ri-user-settings-line",
    number: "30",
    sign: "+",
    title: "MNC & Local Clients",
  },
  {
    id: 5,
    icon: "ri-user-settings-line",
    number: "1000",
    sign: "+",
    title: "Outsource Employee",
  },
];

const Funfacts = () => {
  return (
    <>
      <div className="funfacts-area ptb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">FUN FACTS</span>
            <h2>Let&apos;s Meet Up With Our Fun Facts And Introduce To Us</h2>
          </div>

          <div className="row justify-content-center">
            {funfact &&
              funfact.map((item) => (
                <div className="col-lg-4 col-sm-3 col-6 col-md-3" key={item.id}>
                  <div className="funfacts-box">
                    <i className={item.icon}></i>
                    <h3>
                      <CountUp
                        start={0}
                        end={item.number}
                        enableScrollSpy
                        scrollSpyOnce
                        duration={2.5}
                      />
                      <span className="sign">{item.sign}</span>
                    </h3>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Funfacts;
