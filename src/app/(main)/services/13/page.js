import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import Footer from "@/components/Layouts/Footer";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";

export default function Page() {
  const service = projects.find((item) => item.id === 13);

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
              Labour Law Compliance Audit
            </h2>

            {/* Intro Paragraph */}
            <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
              Our compliance audit protects your organization from legal risks
              and penalties by ensuring policies, benefits, workplace practices,
              and documentation align with Bangladesh Labour Law.
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
                “Stay compliant. Stay protected.”
              </p>
            </blockquote>
          </div>

          {/* Service Image */}
          {service?.image && (
            <Image
              src={service.image}
              alt={service.altText || "Labour Law Compliance Audit"}
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
