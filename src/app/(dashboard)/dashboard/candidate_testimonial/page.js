
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";
import AllCandidateTestimonialList from "@/components/Dashboard/Candidate_Testimonial/AllCandidateTestimonialList";



async function page({ searchParams }) {
  let testimonials=null;
  const currentPage = searchParams?.page || 1;

  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  try {
    const response = await axiosInstance.get(`/api/candidates/v1/candidates/testimonials/list/?page_size=12&page=${currentPage}`,
    {
      headers: {
        Cookie: `access_token=${authToken}`,
      },
    });
    
    testimonials = response.data;
    // console.log("Fetched testimonials:", testimonials);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <AllCandidateTestimonialList testimonials={testimonials}  />
    </div>
  );
}

export default page;
