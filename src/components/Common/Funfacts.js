"use client";
  
import React from "react";

const funfact = [
  {
    id: 1,
    icon: "ri-file-copy-2-line",
    number: "40",
    sign: "K",
    title: "Projects",
  },
  {
    id: 2,
    icon: "ri-book-open-line",
    number: "10",
    sign: "K",
    title: "Case Study",
  },
  {
    id: 3,
    icon: "ri-star-smile-line",
    number: "12",
    sign: "K",
    title: "Clients",
  },
  {
    id: 4,
    icon: "ri-user-settings-line",
    number: "78",
    sign: "K",
    title: "Customers",
  },
];

const Funfacts = () => {
  return (
    <>
      <div className="funfacts-area pb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">FUN FACTS</span>
            <h2>Let&apos;s Meet Up With Our Fun Facts And Introduce To Us</h2>
          </div>

          <div className="row justify-content-center">
            {funfact &&
              funfact.map((item) => (
                <div className="col-lg-3 col-sm-3 col-6 col-md-3" key={item.id}>
                  <div className="funfacts-box">
                    <i className={item.icon}></i>
                    <h3>
                      {item.number}
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
