import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TrainingDetailApex from "@/components/TrainingCatelog/TrainingCatelogDetails";
import axiosInstance from "@/lib/axiosIntance";

import React from "react";

async function page({ params }) {
  const { id } = params;
  let data = {};
  try {
    const response = await axiosInstance.get(
      `/api/training_solutions/v1/training_catalog/${id}/`
    );
    data = response.data;
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

export default page;
