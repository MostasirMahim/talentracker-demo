import "../../styles/bootstrap.min.css";
import "../../styles/animate.min.css";
import "../../styles/remixicon.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";

import BootstrapClient from "@/components/Layouts/BootstrapClient";
// Global Styles
import "../../styles/styles.css";
import "../../styles/responsive.css"; 
import { Montserrat } from "next/font/google";



const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "TalenTracker Limited",
  description: "TalenTracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
