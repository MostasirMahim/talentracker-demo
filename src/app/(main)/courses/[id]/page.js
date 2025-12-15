import { get_course_details, get_learning_segments, get_trainers } from "@/actions/training_solutions";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import  TrainerCarousel  from "@/components/Training_Solutions/components/TrainerCarousel";
import CourseDetail from "@/components/Training_Solutions/learning_segment/CourseDetails";
import CoursesPage from "@/components/Training_Solutions/learning_segment/CoursesGrid";

async function CourseDetails({ params }) {
    const id = params.id;
    let courseData = null;
    let error = null;
  
    try {
      const res = await get_course_details(id);
      if (res?.error) {
        error = res?.message || "Something went wrong.";
      } else {
        courseData = res?.data;
      }
    } catch (err) {
      error = err?.message || "Unexpected error while fetching profile.";
    }
        let coursesData = null;
        let trainersData = null;
        try {
          const res = await get_learning_segments();
          if (res?.error) {
            error = res?.message || "Something went wrong.";
          } else {
            coursesData = res?.data;
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
    <div>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <CourseDetail course={courseData} />
      <TrainerCarousel trainers={trainersData}/>
      <Footer />
    </div>
  )
}

export default CourseDetails