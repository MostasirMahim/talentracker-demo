import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";
import ServiceSidebar from "@/components/Services/ServiceSidebar";
import ServiceQuoteButton from "@/components/Services/ServiceQuoteButton";

export default function Page() {
  const service = projects.find((item) => item.id === 14);

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
                alt={service.altText || "Regulatory Affairs Consultancy"}
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
                Regulatory Affairs Consultancy
              </h2>

              {/* Intro Paragraph */}
              <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                We streamline all organizational regulatory
                activities—documentation, legal correspondence, reporting,
                licensing, and compliance maintenance.
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
                  “Operate confidently with structured compliance support.”
                </p>
              </blockquote>
              <ServiceQuoteButton />
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <ServiceSidebar id={14} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
