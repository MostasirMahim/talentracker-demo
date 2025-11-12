import { ToastContainer } from "react-toastify";
import "../../../../styles/tailwind.css";
import DashboardLayoutClient from "@/components/Dashboard/DashboardLayout";

export const metadata = {
  title: "TalenTracker Limited - Creating Shared Experiences !!",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <ToastContainer />
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </>
  );
}
