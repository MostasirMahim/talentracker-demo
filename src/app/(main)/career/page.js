import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import ProjectsThreeColumn from "@/components/Projects/ProjectsThreeColumn";
import Footer from "@/components/Layouts/Footer";
import JobList from "@/components/JobList/JobList";

const jobs = [
  {
    title: "Jr. Cybersecurity – Offensive (Web/App Pentester)",
    location: "Dhaka",
    type: "Full Time",
    posted: "2 weeks ago",
    description:
      "We’re hiring Jr. Cybersecurity engineers to perform penetration testing...",
  },
  {
    title: "Chief Operating Officer (COO)",
    location: "Dhaka",
    type: "Full Time",
    posted: "1 month ago",
    description:
      "Oversee strategic operations and drive organizational efficiency...",
  },
  {
    title: "Chief Operating Officer (COO)",
    location: "Dhaka",
    type: "Full Time",
    posted: "1 month ago",
    description:
      "Oversee strategic operations and drive organizational efficiency...",
  },
  {
    title: "Chief Operating Officer (COO)",
    location: "Dhaka",
    type: "Full Time",
    posted: "1 month ago",
    description:
      "Oversee strategic operations and drive organizational efficiency...",
  },
  {
    title: "Chief Operating Officer (COO)",
    location: "Dhaka",
    type: "Full Time",
    posted: "1 month ago",
    description:
      "Oversee strategic operations and drive organizational efficiency...",
  },
  {
    title: "Chief Operating Officer (COO)",
    location: "Dhaka",
    type: "Full Time",
    posted: "1 month ago",
    description:
      "Oversee strategic operations and drive organizational efficiency...",
  },
];

export default function Page() {
  return (
    <>
      <TopHeaderStyleTwo />

      <NavbarStyleOne />

      <PageBanner
        pageTitle="Careers"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Careers"
      />

      <JobList jobs={jobs} />

      <Footer />
    </>
  );
}
