import GoTop from "@/components/Layouts/GoTop";
import NavbarStyleTwo from "@/components/Layouts/NavbarStyleTwo";

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
    </>
  );
}
