import { ToastContainer } from "react-toastify";
import "../../../../styles/tailwind.css";
import DashboardLayoutClient from "@/components/Dashboard/DashboardLayout";
import { get_me } from "@/actions/auth";
import { redirect } from "next/navigation";
export const experimental_styleIsolation = true;
export const metadata = {
  title: "TalenTracker Limited - Right People,Right Fit",
  description:
    "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
  icons: {
    icon: "/images/new_favicon_ttl.png",
  },
};

export default async function DashboardLayout({ children }) {
  const authUser = await get_me();
  if (!authUser?.error) {
    if (authUser?.data?.user.user_type !== "admin") {
      redirect("/");
    }
  } else {
    redirect("/");
  }

  return (
    <>
      <ToastContainer />
      <DashboardLayoutClient permissions={authUser?.data?.permissions}>
        {children}
      </DashboardLayoutClient>
    </>
  );
}
