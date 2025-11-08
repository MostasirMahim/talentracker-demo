import "../../../styles/bootstrap.min.css";
import "../../../styles/animate.min.css";
import "../../../styles/remixicon.css";

import BootstrapClient from "@/components/Layouts/BootstrapClient";
// Global Styles
import "../../../styles/styles.css";
import "../../../styles/responsive.css";

import FloatingForm from "@/components/Layouts/FloatingForm";
import GoTop from "@/components/Layouts/GoTop";

export const metadata = {
  title: "TalenTracker Limited - Creating Shared Experiences !!",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
};

export default function MainLayout({ children }) {
  return (
    <>
      {children}
      <GoTop />
      <FloatingForm />
      <BootstrapClient />
    </>
  );
}
