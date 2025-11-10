import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";

export default function Page() {
  const service = projects.find((item) => item.id === 5);

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
              HR & Management Consultancy
            </h2>

            {/* Intro Paragraph */}
            <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
              Your people strategy is your business strategy. We help
              organizations build strong HR structures that support performance,
              culture, and scalability.
            </p>

            {/* Content Section */}
            <div className="mb-4">
              {/* We Assist With */}
              <h5
                className="fw-bold mb-3 mt-4"
                style={{ color: "var(--mainColor)" }}
              >
                We Assist With:
              </h5>
              <ul className="list-unstyled text-secondary ps-3">
                {[
                  "Policy development & HR process automation",
                  "Organizational structuring",
                  "Performance & KPI frameworks",
                  "Leadership and capability building",
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

              {/* Outcome */}
              <h5
                className="fw-bold mb-2 mt-4"
                style={{ color: "var(--mainColor)" }}
              >
                Outcome:
              </h5>
              <p className="text-secondary mb-4">
                A workplace where people are aligned, empowered, and
                accountable.
              </p>

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
                  “Let’s transform HR into your business’s competitive
                  advantage.”
                </p>
              </blockquote>
            </div>
          </div>

          {/* Service Image */}
          {service?.image && (
            <Image
              src={service.image}
              alt={service.altText || "HR & Management Consultancy"}
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
