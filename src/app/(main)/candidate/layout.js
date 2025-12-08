import { get_me } from "@/actions/auth";
import ProfileClient from "@/components/Candidate/profile/layouts/ProfileClient";
import NavbarStyleTwo from "@/components/Layouts/NavbarStyleTwo";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Candidate Dashboard",
  description: "Responsive candidate dashboard with sidebar",
};
export default async function CandidateLayout({ children }) {
   const authUser = await get_me();
    if (!authUser?.error) {
      if (authUser?.data?.user.user_type !== "candidate") {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  return (
    <div>
      <NavbarStyleTwo />
      <ProfileClient>{children}</ProfileClient>
    </div>
  );
}
