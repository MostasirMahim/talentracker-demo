import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";
import ServiceSidebar from "@/components/Services/ServiceSidebar";
import ServiceQuoteButton from "@/components/Services/ServiceQuoteButton";

export default function Page() {
  const service = projects.find((item) => item.id === 4);

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <section
        className="service-detail-section py-5"
        style={{ backgroundColor: "var(--whiteColor)" }}
      >
        <div className="container row">
          <div className="col-lg-8 col-md-12">
            {/* Service Image */}
            {service?.image && (
              <Image
                src={service.image}
                alt={service.altText || "Career Counselling & Placement"}
                width={1260}
                height={380}
                className="rounded-4"
              />
            )}

            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 service-card">
              {/* Title */}
              <h2
                className="fw-bold mb-3"
                style={{ color: "var(--mainColor2)", fontSize: "1.8rem" }}
              >
                Career Counselling & Placement
              </h2>

              {/* Intro Paragraph */}
              <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                We empower individuals to make informed, meaningful career
                decisions. Whether you’re starting your career or shifting
                direction, our counsellors provide personalized guidance, skill
                evaluation, interview readiness, and placement opportunities.
              </p>

              {/* Content Section */}
              <div className="mb-4">
                <p className="text-secondary mb-3">
                  For employers, we supply job-ready and motivated talent.
                </p>

                {/* We Help Candidates */}
                <h5
                  className="fw-bold mb-3 mt-4"
                  style={{ color: "var(--mainColor)" }}
                >
                  We Help Candidates:
                </h5>
                <ul className="list-unstyled text-secondary ps-3">
                  {[
                    "Identify future career direction",
                    "Develop employability skills",
                    "Secure relevant job placements",
                  ].map((point, index) => (
                    <li key={index} className="d-flex align-items-start mb-2">
                      <span
                        className="bullet me-2 mt-1"
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "var(--mainColor2)",
                          flexShrink: 0,
                        }}
                      ></span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Closing Quote */}
                <blockquote
                  className="p-3"
                  style={{
                    backgroundColor: "#f9fcff",
                  }}
                >
                  <p
                    className="mb-0 fw-semibold fst-italic"
                    style={{ color: "var(--mainColor2)" }}
                  >
                    “A career is a journey. Let’s build yours the right way.”
                  </p>
                </blockquote>
              </div>
              <ServiceQuoteButton />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <ServiceSidebar id={4} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
