import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";
import ServiceSidebar from "@/components/Services/ServiceSidebar";
import ServiceQuoteButton from "@/components/Services/ServiceQuoteButton";

export default function Page() {
  const service = projects.find((item) => item.id === 3);

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
                alt={service.altText || "Pre-Employment Screening"}
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
                Pre-Employment Screening
              </h2>

              {/* Intro Paragraph */}
              <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                A strong workforce begins with trusted, credible employees. Our
                thorough pre-employment screening protects your organization from
                fraud, misconduct, and reputational risks.
              </p>

              {/* Content Section */}
              <div className="mb-4">
                <p className="text-secondary mb-3">
                  We verify identity, qualifications, employment history,
                  references, and legal/trustworthiness indicators to ensure every
                  candidate meets your organization’s standards.
                </p>

                {/* Benefits */}
                <h5
                  className="fw-bold mb-3 mt-4"
                  style={{ color: "var(--mainColor)" }}
                >
                  Benefits:
                </h5>
                <ul className="list-unstyled text-secondary ps-3">
                  {[
                    "Safer workplace culture",
                    "Reduced turnover & internal conflict",
                    "Compliance and risk management assurance",
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
                  <b>Hire confidently. Hire safely.</b>
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
                    “Let us verify before you onboard.”
                  </p>
                </blockquote>
              </div>
              <ServiceQuoteButton />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <ServiceSidebar id={3} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
