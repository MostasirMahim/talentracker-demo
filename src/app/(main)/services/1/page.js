import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";
import BlogSidebar from "@/components/Blog/BlogSidebar";
import ServiceSidebar from "@/components/Services/ServiceSidebar";
import ServiceQuoteButton from "@/components/Services/ServiceQuoteButton";

export default function Page() {
  const service = projects.find((item) => item.id === 1);

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
            <Image
              src={service.image}
              alt={service.altText}
              width={1260}
              height={380}
              className="rounded-4"
            />
            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 service-card">
              {/* Title */}
              <h2
                className="fw-bold mb-3"
                style={{ color: "var(--mainColor2)", fontSize: "1.8rem" }}
              >
                Executive Search & Head Hunting
              </h2>

              {/* Intro Paragraph */}
              <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                Great leadership shapes great organizations. At{" "}
                <strong>TalenTracker Limited</strong>, we don’t simply find
                candidates — we discover leaders who elevate your business
                performance, inspire teams, and align with your culture and
                vision.
              </p>

              {/* Content Section */}
              <div className="mb-4">
                <p className="text-secondary mb-3">
                  Our executive search experts utilize confidential talent
                  mapping, professional network access, and industry-specific
                  insights to connect you with exceptional senior-level
                  professionals — most of whom are not actively searching for
                  roles.
                </p>

                {/* Why Clients Choose */}
                <h5
                  className="fw-bold mb-3 mt-4"
                  style={{ color: "var(--mainColor)" }}
                >
                  Why Clients Choose This Service:
                </h5>
                <ul className="list-unstyled text-secondary ps-3">
                  <li className="d-flex align-items-start mb-2">
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
                    Access to hidden talent pools and passive candidates
                  </li>
                  <li className="d-flex align-items-start mb-2">
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
                    Rigorous personality & leadership suitability evaluation
                  </li>
                  <li className="d-flex align-items-start mb-2">
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
                    Confidential, discreet & strategic approach
                  </li>
                </ul>

                {/* Result */}
                <h5
                  className="fw-bold mb-2 mt-4"
                  style={{ color: "var(--mainColor)" }}
                >
                  The Result:
                </h5>
                <p className="text-secondary mb-4">
                  Leadership that drives growth, innovation, and competitive
                  advantage.
                </p>

                {/* Closing Line */}
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
                    “Looking to hire someone who can actually move your
                    organization forward? Let’s identify your next impactful
                    leader.”
                  </p>
                </blockquote>
              </div>
              <ServiceQuoteButton />
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <ServiceSidebar id={1} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
