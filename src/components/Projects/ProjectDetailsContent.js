"use client";

import React from "react";
import ProjectDetailsSidebar from "@/components/ProjectDetails/ProjectDetailsSidebar";
import Image from "next/image";

const ProjectDetailsContent = () => {
  return (
    <>
      <div className="projects-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="projects-details-image">
                <Image
                  src="/images/projects/projects1.jpg"
                  alt="image"
                  width={860}
                  height={463}
                />
              </div>

              <div className="projects-details-desc">
                <h3>Project Details</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since. Lorem Ipsum has been the
                  industry. Lorem Ipsum has been the industry standard dummy
                  text since. Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry.
                </p>
                <p>
                  <strong>1.</strong> Sony PlayStation 4 Pro – Best Overall
                  <br />
                  <strong>2.</strong> Xbox One S – Best <strong>Gaming</strong>{" "}
                  Console for Multimedia
                  <br />
                  <strong>3.</strong> Nintendo Switch – Best Hybrid Gaming
                  Console
                  <br />
                  <strong>4.</strong> Nintendo Switch Lite – Best for Portable
                  Play
                </p>
                <p>
                  It is a long established fact that a reader will be{" "}
                  <strong>distracted</strong> by the readable content of a page
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters, as
                  opposed to using ‘Content here, content here’, making it look
                  like readable English. Latin words, combined with a handful of
                  model sentence structures, to generate Lorem Ipsum which looks
                  reasonable.
                </p>

                <ul className="wp-block-gallery columns-3">
                  <li className="blocks-gallery-item">
                    <figure>
                      <Image
                        src="/images/blog/blog2.jpg"
                        alt="image"
                        width={860}
                        height={622}
                      />
                    </figure>
                  </li>
                  <li className="blocks-gallery-item">
                    <figure>
                      <Image
                        src="/images/blog/blog3.jpg"
                        alt="image"
                        width={860}
                        height={622}
                      />
                    </figure>
                  </li>
                  <li className="blocks-gallery-item">
                    <figure>
                      <Image
                        src="/images/blog/blog4.jpg"
                        alt="image"
                        width={860}
                        height={622}
                      />
                    </figure>
                  </li>
                </ul>

                <p>
                  It is a long established fact that a reader will be{" "}
                  <strong>distracted</strong> by the readable content of a page
                  when looking at its <a href="#">layout</a>. The point of using
                  Lorem Ipsum is that it has a more-or-less normal distribution
                  of letters, as opposed to using ‘Content here, content here’,
                  making it look like readable English. Latin words, combined
                  with a handful of model sentence structures, to generate Lorem
                  Ipsum which looks reasonable.
                </p>
                <ul>
                  <li>a console</li>
                  <li>
                    Two Joy-Con controllers that are <strong>detachable</strong>
                  </li>
                  <li>
                    A grip that enables you to combine them into a single
                    gamepad for play on the TV
                  </li>
                  <li>
                    Two straps for turning the Joy-Cons into{" "}
                    <a href="#">individual</a> controllers
                  </li>
                  <li>
                    A dock which you can use to connect your console to the
                    television for traditional gameplay
                  </li>
                </ul>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don’t look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn’t anything
                  embarrassing hidden in the middle of text.
                </p>

                <h3>Results</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod tempor incididunt ut labore et dolore magna ad aliqua.
                  Ut enim ad minim veniam quis nostrud exercitation ullamco
                  labori.
                </p>
                <p>
                  <strong>
                    <i>Last updated: January 25, 2024 at 24:00 PM</i>
                  </strong>
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <ProjectDetailsSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsContent;
