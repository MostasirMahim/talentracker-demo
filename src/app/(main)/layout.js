import "../../../styles/bootstrap.min.css";
import "../../../styles/animate.min.css";
import "../../../styles/remixicon.css";

import BootstrapClient from "@/components/Layouts/BootstrapClient";
// Global Styles
import "../../../styles/styles.css";
import "../../../styles/responsive.css";

import FloatingForm from "@/components/Layouts/FloatingForm";
import GoTop from "@/components/Layouts/GoTop";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "TalenTracker Limited - Right People,Right Fit",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
  icons: {
    icon: "/images/TTL_Fav.png",
  },
};

export default function MainLayout({ children }) {
  return (
    <>
      <ToastContainer />
      {children}
      <GoTop />
      <FloatingForm />
      <BootstrapClient />
    </>
  );
}
