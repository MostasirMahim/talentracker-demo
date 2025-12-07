import { get_me } from "@/actions/auth";
import NavbarStyleTwo from "@/components/Layouts/NavbarStyleTwo";
import TrainerLayoutClient from "@/components/Trainer/TrainerLayoutClient";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Trainer Dashboard",
  description: "Responsive trainer dashboard with sidebar",
};
export default async function RootLayout({ children }) {
   const authUser = await get_me();
    if (!authUser?.error) {
      if (authUser?.data?.user.user_type !== "trainer") {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  return (
    <div>
      <NavbarStyleTwo />
      <TrainerLayoutClient>{children}</TrainerLayoutClient>
    </div>
  );
}
