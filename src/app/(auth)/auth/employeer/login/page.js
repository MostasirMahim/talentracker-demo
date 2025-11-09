import Link from "next/link";
import Image from "next/image";

function EmployeerLogIn() {
  return (
    <>
      <div className="profile-authentication-area">
        <div className="logo">
          <Link href="/" className="d-inline-block">
            <Image src="/images/ttl_logo.png" alt="logo" width={200} height={50} />
          </Link>
        </div>

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="signin-form">
                <h2>Log In</h2>

                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username or email"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
                      <p>
                        <input type="checkbox" id="test" />
                        <label htmlFor="test">Remember me</label>
                      </p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
                      <Link href="#" className="lost-your-password">
                        Lost your password?
                      </Link>
                    </div>
                  </div>

                  <button type="submit">Log In</button>

                  <span className="dont-account">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/employeer/register">Sign Up Now!</Link>
                  </span>
                </form>

              </div>
            </div>
          </div>
        </div>

        <ul className="social-links d-flex align-items-center justify-content-center">
          <li>
            <span>Follow Us On:</span>
          </li>
          <li>
            <a
              href="https://www.facebook.com/talentracker/"
              className="facebook"
              target="_blank"
            >
              <i className="ri-facebook-fill"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/talentracker-limited/"
              className="linkedin"
              target="_blank"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/talen_tracker?igsh=NXN2NWY3d2E1a3B4"
              className="instagram"
              target="_blank"
            >
              <i className="ri-instagram-line"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default EmployeerLogIn;