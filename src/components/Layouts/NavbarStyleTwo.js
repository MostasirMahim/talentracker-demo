"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopHeaderStyleOne from "@/components/Layouts/TopHeaderStyleOne";
import Image from "next/image";

const NavbarStyleTwo = () => {
  const pathname = usePathname();

  const [menu, setMenu] = React.useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  // Search Modal
  const [isActiveSearchModal, setActiveSearchModal] = useState("false");
  const handleToggleSearchModal = () => {
    setActiveSearchModal(!isActiveSearchModal);
  };

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <div className="header-area">
        {/* Top Header Style One */}
        <TopHeaderStyleOne />

        <div id="navbar" className="navbar-area navbar-style-two">
          <div className="zixon-nav">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link href="/" className="navbar-brand">
                  <Image
                    src="/images/ttl_logo.png"
                    alt="logo"
                    width={154}
                    height={33}
                  />
                </Link>

                <button
                  onClick={toggleNavbar}
                  className={classTwo}
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"></span>
                  <span className="icon-bar bottom-bar"></span>
                </button>

                <div className={classOne} id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        href="/"
                        className={`nav-link ${
                          pathname == "/" && "active"
                        }`}
                      >
                        Home
                      </Link>
                    </li>

                    <li className="nav-item">
                    <Link
                      href="/about-us/"
                      className={`nav-link ${
                        pathname == "/about-us/" && "active"
                      }`}
                    >
                      About Us
                    </Link>
                  </li>
                    <li className="nav-item">
                      <Link
                        href="/services/"
                        className={`nav-link ${
                          pathname == "/services/" && "active"
                        }`}
                      >
                        Services
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/career/"
                         className={`nav-link ${
                          pathname == "/career/" && "active"
                        }`}
                      >
                        Careers
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/training-solutions/"
                          className={`nav-link ${
                          pathname == "/training-solutions/" && "active"
                        }`}
                      >
                        Training Solutions
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/blog/"
                          className={`nav-link ${
                          pathname == "/blog/" && "active"
                        }`}
                      >
                        Gallary & Blog
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/contact/"
                        className={`nav-link ${
                          pathname == "/contact/" && "active"
                        }`}
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="others-option">
                  <div
                    className="search-icon"
                    onClick={handleToggleSearchModal}
                  >
                    <i className="ri-search-line"></i>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div
        className={`search-overlay ${
          isActiveSearchModal ? "" : "search-overlay-active"
        }`}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>

            <div
              className="search-overlay-close"
              onClick={handleToggleSearchModal}
            >
              <span className="search-overlay-close-line"></span>
              <span className="search-overlay-close-line"></span>
            </div>

            <div className="search-overlay-form">
              <form>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Enter your keywords..."
                />
                <button type="submit">
                  <i className="ri-search-line"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarStyleTwo;
