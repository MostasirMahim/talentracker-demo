"use client";
  
import React from "react";

const funfact = [
  {
    id: 1,
    number: "40",
    sign: "K",
    title: "Projects",
  },
  {
    id: 2,
    number: "10",
    sign: "K",
    title: "Case Study",
  },
  {
    id: 3,
    number: "12",
    sign: "K",
    title: "Clients",
  },
  {
    id: 4,
    number: "78",
    sign: "K",
    title: "Customers",
  },
];

const FunfactsTwo = () => {
  return (
    <>
      <div className="funfacts-area bg-color">
        <div className="container">
          <div className="row justify-content-center">
            {funfact &&
              funfact.map((item) => (
                <div className="col-lg-3 col-sm-3 col-6 col-md-3" key={item.id}>
                  <div className="single-funfacts-box">
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

export default FunfactsTwo;
