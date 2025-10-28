import "../../styles/bootstrap.min.css";
import "../../styles/animate.min.css";
import "../../styles/remixicon.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
// Global Styles
import "../../styles/styles.css";
import "../../styles/responsive.css"; 

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "TalenTracker Limited - Creating Shared Experiences !!",
  description: "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
