import Link from "next/link";
import Image from "next/image";
import PasswordResetSuccess from "@/components/Auth/forget-password/ResetSuccess";
import ForgetIdEmail from "@/components/Auth/forget-password/ForgetIdEmail";
import ForgetOtp from "@/components/Auth/forget-password/ForgetOtp";
import ResetPassword from "@/components/Auth/forget-password/ResetPassword";

function EmailVerification({ searchParams }) {
  const email = searchParams?.email;
  const success = searchParams?.success;
  const step = searchParams?.step;

  let FormComponent = <ForgetIdEmail />;

  if (success) {
    FormComponent = <PasswordResetSuccess />;
  } else if (email && step === "1") {
    FormComponent = <ForgetOtp email={email} />;
  } else if (email && step === "2") {
    FormComponent = <ResetPassword email={email} />;
  }
  return (
    <>
      <div className="profile-authentication-area">
        <div className="logo">
          <Link href="/" className="d-inline-block">
            <Image
              src="/images/ttl_logo.png"
              alt="logo"
              width={200}
              height={50}
            />
          </Link>
        </div>

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="signin-form">
                <h2>Forget Password</h2>
                {FormComponent}
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

export default EmailVerification;
