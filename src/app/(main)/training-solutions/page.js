export const dynamic = "force-dynamic";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import CoursesPage from "@/components/Training_Solutions/learning_segment/CoursesGrid";
import {
  get_catalogs,
  get_learning_segments,
  get_trainers,
} from "@/actions/training_solutions";
import TrainerCarousel from "@/components/Training_Solutions/components/TrainerCarousel";
import CatalogPage from "@/components/Training_Solutions/catalogs/CatalogPage";

async function Page({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  let courseData = null;
  let trainersData = null;
  let catalogsData = null;
  let catalogsPagination = null;
  let error = null;

  try {
    const res = await get_learning_segments();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      courseData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }

  try {
    const res = await get_trainers();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      trainersData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }

  try {
    const res = await get_catalogs(currentPage);
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      catalogsData = res?.data;
      catalogsPagination = res?.pagination;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }
  if (error) {
    return (
      <div
        style={{
          padding: "2.5rem",
          textAlign: "center",
          color: "#ef4444",
          fontSize: "1.125rem",
        }}
      >
        <p style={{ marginBottom: "0.5rem" }}>
          🚩 Failed to load data. Try once again!
        </p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="Training Solutions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Training Solutions"
      />
      <CatalogPage catalogs={catalogsData} pagination={catalogsPagination} />
      <TrainerCarousel trainers={trainersData} />
      <CoursesPage courses={courseData} />
      <Footer />
    </>
  );
}
export default Page;
