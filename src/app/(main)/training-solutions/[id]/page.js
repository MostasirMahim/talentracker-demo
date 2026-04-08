import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TrainingDetailApex from "@/components/TrainingCatelog/TrainingCatelogDetails";
import axiosInstance from "@/lib/axiosIntance";

async function TrainingSolutionDetails({ params }) {
  const { id } = params;
  let data = {};
  try {
    const response = await axiosInstance.get(
      `/api/training_solutions/v1/training_catalog/slugs/${id}/`,
    );
    data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <NavbarStyleOne />
      <TrainingDetailApex data={data} />
      <Footer />
    </div>
  );
}

export default TrainingSolutionDetails;
