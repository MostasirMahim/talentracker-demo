import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

export async function generateMetadata() {
  return {
    title: "TalenTracker Limited",
    description: "TalenTracker Limited is a full-service Human Resources Business Partnering and Consultancy firm.",
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          href: "/favicon.ico",
        },
      ],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
