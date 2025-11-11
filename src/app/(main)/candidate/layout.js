import ProfileClient from "@/components/Candidate/profile/layouts/ProfileClient";
import NavbarStyleTwo from "@/components/Layouts/NavbarStyleTwo";
export const metadata = {
  title: "Client Dashboard",
  description: "Responsive client dashboard with sidebar",
};
export default function RootLayout({ children }) {
  return (
    <div>
      <NavbarStyleTwo />
      <ProfileClient>{children}</ProfileClient>
    </div>
  );
}
