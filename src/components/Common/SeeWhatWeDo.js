"use client";

import React from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";

const SeeWhatWeDo = () => {
  return (
    <>
      <div className="what-we-do-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="what-we-do-image">
                <Image
                  src="/images/what-we-do/what-we-do1.jpg"
                  alt="image"
                  width={720}
                  height={862}
                />

                <Image
                  src="/images/shape/shape5.png"
                  alt="image"
                  className="shape"
                  width={196}
                  height={303}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="what-we-do-content">
                <span className="sub-title">SEE WHAT WE DO</span>
                <h2>Information is the Main Point to Success on Business</h2>

                <Tabs>
                  <TabList>
                    <Tab>Project</Tab>
                    <Tab>Case Study</Tab>
                    <Tab>Services</Tab>
                    <Tab>Training</Tab>
                  </TabList>

                  <TabPanel>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy ant extra eirmod tempor invidunt ut labore
                      et dolore magna aliquyam erat, sed diammi maxil voluptua.
                      At vero eos et accusam et justo duo dolores et ea rebum.
                      Stet clitaiai to ankasd gubergren, no sea takimata sanctus
                      est Lorem ipsum dolor sit amet. Adasta na lorem ipsum
                      dolor sit amet, consetetur sadipscing elitr.
                    </p>
                  </TabPanel>

                  <TabPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as
                      their.
                    </p>
                  </TabPanel>

                  <TabPanel>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classical
                      literature.
                    </p>
                  </TabPanel>

                  <TabPanel>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      dot look even slightly believable. If you are going to use
                      a passage of Lorem Ipsum, you need to be sure there is
                      anything embarrassing hidden in the middle of text. All
                      the Lorem Ipsum generators on the Internet tend to repeat
                      predefined
                    </p>
                  </TabPanel>
                </Tabs>

                <Link href="/contact" className="default-btn">
                  Book a Meeting <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeWhatWeDo;
