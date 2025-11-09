import "../../../styles/bootstrap.min.css";
import "../../../styles/animate.min.css";
import "../../../styles/remixicon.css";

// Global Styles
import "../../../styles/styles.css";
import "../../../styles/responsive.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "TalenTracker Limited - Creating Shared Experiences !!",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
};

export default function AuthLayout({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
