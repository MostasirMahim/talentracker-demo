import "../../../styles/bootstrap.min.css";
import "../../../styles/animate.min.css";
import "../../../styles/remixicon.css";

// Global Styles
import "../../../styles/styles.css";
import "../../../styles/responsive.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "TalenTracker Limited - Right People, Right Fit",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
  icons: {
    icon: "/images/new_favicon_ttl.png",
  },
};

export default function AuthLayout({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
