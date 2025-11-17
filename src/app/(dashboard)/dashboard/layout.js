import { ToastContainer } from "react-toastify";
import "../../../../styles/tailwind.css";
import DashboardLayoutClient from "@/components/Dashboard/DashboardLayout";
import { get_me } from "@/actions/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "TalenTracker Limited - Creating Shared Experiences !!",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
};

export default async function DashboardLayout({ children }) {
  const authUser = await get_me();
  if (!authUser?.error) {
    if (authUser?.data?.user.user_type !== "") {
      redirect("/");
    }
  } else {
    redirect("/");
  }

  return (
    <>
      <ToastContainer />
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </>
  );
}
