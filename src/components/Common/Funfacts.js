"use client";

import axiosInstance from "@/lib/axiosIntance";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const Funfacts = () => {
  const [hooks, setHooks] = useState({});
  const [funfact, setFunfact] = useState([
    {
      id: 1,
      icon: "ri-file-copy-2-line",
      number: 0,
      sign: "K+",
      title: "Screened Resume",
    },
    {
      id: 2,
      icon: "ri-book-open-line",
      number: 0,
      sign: "K",
      title: "Access Profiles",
    },
    {
      id: 3,
      icon: "ri-team-fill",
      number: 0,
      sign: "+",
      title: "Trained Employee",
    },
    {
      id: 4,
      icon: "ri-user-settings-line",
      number: 0,
      sign: "+",
      title: "MNC & Local Clients",
    },
    {
      id: 5,
      icon: "ri-user-settings-line",
      number: 0,
      sign: "+",
      title: "Outsource Employee",
    },
  ]);
  useEffect(() => {
    const getHooksData = async () => {
      try {
        const response = await axiosInstance.get("/api/hooks/v1/hooks/");
        if (response.status == 200) {
          setHooks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHooksData();
  }, []);

  useEffect(() => {
    if (hooks) {
      setFunfact([
        {
          id: 1,
          icon: "ri-file-copy-2-line",
          number: hooks?.data?.scanned_resume,
          sign: "K+",
          title: "Screened Resume",
        },
        {
          id: 2,
          icon: "ri-book-open-line",
          number: hooks?.data?.access_to_profile,
          sign: "K",
          title: "Access Profiles",
        },
        {
          id: 3,
          icon: "ri-team-fill",
          number: hooks?.data?.trained_employee,
          sign: "+",
          title: "Trained Employee",
        },
        {
          id: 4,
          icon: "ri-user-settings-line",
          number: hooks?.data?.mnc_and_local_clients,
          sign: "+",
          title: "MNC & Local Clients",
        },
        {
          id: 5,
          icon: "ri-user-settings-line",
          number: hooks?.data?.out_source_employee,
          sign: "+",
          title: "Outsource Employee",
        },
      ]);
    }
  }, [hooks]);

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
              funfact.map((item, index) => (
                <div className="col-lg-4 col-sm-3 col-6 col-md-3" key={item.id}>
                  <div className="funfacts-box">
                    <i className={item.icon}></i>
                    <h3>
                      <CountUp
                        key={item?.number || index}
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
