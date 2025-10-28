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
                    src="/images/logo.png"
                    alt="logo"
                    width={147}
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
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        Home
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="/"
                            className={`nav-link ${
                              pathname == "/" && "active"
                            }`}
                          >
                            Home Demo - 1
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/home-2/"
                            className={`nav-link ${
                              pathname == "/home-2/" && "active"
                            }`}
                          >
                            Home Demo - 2
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/home-3/"
                            className={`nav-link ${
                              pathname == "/home-3/" && "active"
                            }`}
                          >
                            Home Demo - 3
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        Pages
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="dropdown-toggle nav-link"
                          >
                            About Us
                          </Link>

                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <Link
                                href="/about-simple/"
                                className={`nav-link ${
                                  pathname == "/about-simple/" && "active"
                                }`}
                              >
                                About Simple
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                href="/about-modern/"
                                className={`nav-link ${
                                  pathname == "/about-modern/" && "active"
                                }`}
                              >
                                About Modern
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/company-history/"
                            className={`nav-link ${
                              pathname == "/company-history/" && "active"
                            }`}
                          >
                            Company History
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/team/"
                            className={`nav-link ${
                              pathname == "/team/" && "active"
                            }`}
                          >
                            Our Team
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/testimonials/"
                            className={`nav-link ${
                              pathname == "/testimonials/" && "active"
                            }`}
                          >
                            Testimonials
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/faq/"
                            className={`nav-link ${
                              pathname == "/faq/" && "active"
                            }`}
                          >
                            FAQ
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/sign-in/"
                            className={`nav-link ${
                              pathname == "/sign-in/" && "active"
                            }`}
                          >
                            Sign In
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/sign-up/"
                            className={`nav-link ${
                              pathname == "/sign-up/" && "active"
                            }`}
                          >
                            Sign Up
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/privacy-policy/"
                            className={`nav-link ${
                              pathname == "/privacy-policy/" && "active"
                            }`}
                          >
                            Privacy Policy
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/terms-conditions/"
                            className={`nav-link ${
                              pathname == "/terms-conditions/" && "active"
                            }`}
                          >
                            Terms & Conditions
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/coming-soon/"
                            className={`nav-link ${
                              pathname == "/coming-soon/" && "active"
                            }`}
                          >
                            Coming Soon
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/404/"
                            className={`nav-link ${
                              pathname == "/404/" && "active"
                            }`}
                          >
                            404 Error Page
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        Services
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="/services/"
                            className={`nav-link ${
                              pathname == "/services/" && "active"
                            }`}
                          >
                            Services Style 01
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/services/2/"
                            className={`nav-link ${
                              pathname == "/services/2/" && "active"
                            }`}
                          >
                            Services Style 02
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/services/3/"
                            className={`nav-link ${
                              pathname == "/services/3/" && "active"
                            }`}
                          >
                            Services Style 03
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/services/details/"
                            className={`nav-link ${
                              pathname == "/services/details/" && "active"
                            }`}
                          >
                            Services Details
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        Projects
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="/projects/"
                            className={`nav-link ${
                              pathname == "/projects/" && "active"
                            }`}
                          >
                            Projects Two Column
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/projects/2/"
                            className={`nav-link ${
                              pathname == "/projects/2/" && "active"
                            }`}
                          >
                            Projects Three Column
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/projects/3/"
                            className={`nav-link ${
                              pathname == "/projects/3/" && "active"
                            }`}
                          >
                            Projects Right Sidebar
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/projects/details/"
                            className={`nav-link ${
                              pathname == "/projects/details/" && "active"
                            }`}
                          >
                            Projects Details
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        About Us
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="/about-simple/"
                            className={`nav-link ${
                              pathname == "/about-simple/" && "active"
                            }`}
                          >
                            About Simple
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/about-modern/"
                            className={`nav-link ${
                              pathname == "/about-modern/" && "active"
                            }`}
                          >
                            About Modern
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle nav-link"
                      >
                        Blog
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="/blog/"
                            className={`nav-link ${
                              pathname == "/blog/" && "active"
                            }`}
                          >
                            Blog Grid
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/blog/with-right-sidebar/"
                            className={`nav-link ${
                              pathname == "/blog/with-right-sidebar/" &&
                              "active"
                            }`}
                          >
                            Blog Right Sidebar
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/blog/details/"
                            className={`nav-link ${
                              pathname == "/blog/details/" && "active"
                            }`}
                          >
                            Blog Details
                          </Link>
                        </li>
                      </ul>
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
