import { get_training_service_categories } from "@/actions/training_solutions";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import { ServiceRequestForm } from "@/components/Training_Solutions/components/ServiceRequestForm";
async function RequestForTrainingServices() {
  let sampleData = null;
  let error = null;

  try {
    const res = await get_training_service_categories();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      sampleData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }
  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
          padding: "2rem 1rem",
        }}
      >
        <ServiceRequestForm categories={sampleData} />
      </main>
      <Footer />
    </>
  );
}

export default RequestForTrainingServices;
