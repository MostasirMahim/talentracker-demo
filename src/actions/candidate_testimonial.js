import axiosInstance from "@/lib/axiosIntance";

export default async function fetchTestimonials() {
  try {
    const testimonialResponse = await axiosInstance.get("/api/candidates/v1/candidates/testimonials/?home_testimonial=true");
    return testimonialResponse.data || { data: [] }; // Return the data object with data array
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return { data: [] }; // Return empty structure on error
  }
}