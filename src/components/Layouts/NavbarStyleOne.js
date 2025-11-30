"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SideCanvas from "./SideCanvas";
import { get_me } from "@/actions/auth";
import { useLayoutTransitionStore } from "@/stores/layout_transition_store";
import { useUserStore } from "@/stores/user_store";

const NavbarStyleOne = () => {
  const pathname = usePathname();
  const [menu, setMenu] = React.useState(true);
  const { setUser, user: data } = useUserStore();
  const { setLayoutTransitionOn } = useLayoutTransitionStore();
  const user = data?.error === false ? true : "";
  const handleFetchData = async () => {
    const fetchedData = await get_me();
    setUser(fetchedData);
  };
  useEffect(() => {
    handleFetchData();
  }, []);
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
      <div id="navbar" className="navbar-area">
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
                      className={`nav-link ${pathname == "/" && "active"}`}
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
                        pathname.startsWith("/services/") ? "active" : ""
                      }`}
                    >
                      Services
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/career/"
                      className={`nav-link ${
                        pathname.startsWith("/career/") ? "active" : ""
                      }`}
                    >
                      Career
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/coming_soon"
                      className={`nav-link ${
                        pathname == "/training_solutions/" && "active"
                      }`}
                    >
                      Training solutions
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="dropdown-toggle nav-link"
                    >
                      Resources
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/news/"
                          className={`nav-link ${
                            pathname == "/news/" && "active"
                          }`}
                        >
                          News
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/blog/all/"
                          className={`nav-link ${
                            pathname == "/blog/" && "active"
                          }`}
                        >
                          Blog
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/gallery/"
                          className={`nav-link ${
                            pathname == "/gallery/" && "active"
                          }`}
                        >
                          Gallery
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {user ? (
                    <li className="nav-item">
                      <Link
                        href={`${
                          data?.data?.user?.user_type === "admin"
                            ? "/dashboard"
                            : `/${data?.data?.user?.user_type}/profile/`
                        }`}
                        className={`nav-link ${
                          pathname.startsWith(
                            `/${data?.data?.user?.user_type}/profile/`
                          )
                            ? "active"
                            : ""
                        }`}
                        target="_blank"
                      >
                        {data?.data?.user?.user_type === "admin" ? (
                          <span
                            style={{ color: "#333" }}
                            onClick={() => setLayoutTransitionOn()}
                          >
                            Dashboard
                          </span>
                        ) : (
                          "Profile"
                        )}
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link href="#" className="dropdown-toggle nav-link">
                        Login
                      </Link>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            href="/auth/candidate/login/"
                            className={`nav-link`}
                          >
                            Login as Candidate
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link href="/coming_soon" className={`nav-link`}>
                            Login as Trainer
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>

              <div className="others-option">
                <div className="search-icon" onClick={handleToggleSearchModal}>
                  <i className="ri-search-line"></i>
                </div>
                <div
                  className="search-icon"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                  role="button"
                >
                  <i className="ri-dashboard-line"></i>
                </div>
              </div>
            </nav>
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

      {/* Side Canvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <SideCanvas />
      </div>
    </>
  );
};

export default NavbarStyleOne;
