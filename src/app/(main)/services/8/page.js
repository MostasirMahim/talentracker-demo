import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";
import ServiceSidebar from "@/components/Services/ServiceSidebar";
import ServiceQuoteButton from "@/components/Services/ServiceQuoteButton";

export default function Page() {
  const service = projects.find((item) => item.id === 8);

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <section
        className="container service-detail-section py-5"
        style={{ backgroundColor: "var(--whiteColor)" }}
      >
        <div className="row">
          <div className="col-lg-8 col-md-12">
            {/* Service Image */}
            {service?.image && (
              <Image
                src={service.image}
                alt={service.altText || "Remote & Contract Staffing"}
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
                Remote & Contract Staffing
              </h2>

              {/* Intro Paragraph */}
              <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                Scale your workforce quickly without long-term commitments. We
                provide trained, pre-screened professionals ready for immediate
                deployment—remote, onsite, or hybrid.
              </p>

              {/* Content Section */}
              <div className="mb-4">
                <p className="text-secondary mb-3">
                  We manage HR, payroll, compliance, attendance, and performance
                  reporting.
                </p>

                {/* Best For */}
                <h5
                  className="fw-bold mb-3 mt-4"
                  style={{ color: "var(--mainColor)" }}
                >
                  Best For:
                </h5>
                <ul className="list-unstyled text-secondary ps-3">
                  {[
                    "Project-based staffing",
                    "Market expansion",
                    "Flexible team scaling",
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
                    “Grow your team without the hassle. We manage the workforce
                    for you.”
                  </p>
                </blockquote>
              </div>
              <ServiceQuoteButton />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <ServiceSidebar id={8} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
