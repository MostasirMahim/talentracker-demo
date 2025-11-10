import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";

export default function Page() {
  const service = projects.find((item) => item.id === 2);

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <section
        className="service-detail-section py-5"
        style={{ backgroundColor: "var(--whiteColor)" }}
      >
        <div className="container">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 service-card">
            {/* Title */}
            <h2
              className="fw-bold mb-3"
              style={{ color: "var(--mainColor2)", fontSize: "1.8rem" }}
            >
              Recruitment Process Outsourcing (RPO)
            </h2>

            {/* Intro Paragraph */}
            <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
              In today’s fast-changing business environment, talent acquisition
              needs to be fast, consistent, and scalable. Our RPO solution acts
              as an <b>extension of your HR team</b>, managing recruitment
              end-to-end with precision and accountability.
            </p>

            {/* Content Section */}
            <div className="mb-4">
              <p className="text-secondary mb-3">
                We utilize technology-enabled sourcing, competency-based
                screening, and employer branding techniques to ensure every hire
                is the <b>right hire</b>.
              </p>

              {/* What You Gain */}
              <h5
                className="fw-bold mb-3 mt-4"
                style={{ color: "var(--mainColor)" }}
              >
                What You Gain:
              </h5>
              <ul className="list-unstyled text-secondary ps-3">
                {[
                  "Reduced hiring costs",
                  "Faster recruitment turnaround",
                  "Improved quality-of-hire",
                  "KPI-driven recruitment dashboards",
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

              {/* Closing Paragraph */}
              <p className="text-secondary mb-4">
                Your hiring becomes{" "}
                <b>smarter, smoother, and strategically aligned</b>
                with your business goals.
              </p>

              {/* Quote / Closing Line */}
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
                  “Struggling with ongoing recruitment needs? Let our expert
                  hiring team handle it while you focus on growth.”
                </p>
              </blockquote>
            </div>
          </div>

          {/* Service Image */}
          {service?.image && (
            <Image
              src={service.image}
              alt={service.altText || "Recruitment Process Outsourcing"}
              width={1260}
              height={380}
              className="rounded-4 mt-4"
            />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
