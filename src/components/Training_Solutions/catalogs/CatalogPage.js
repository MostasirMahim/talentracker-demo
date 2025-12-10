"use client";

import CTAButtons from "../components/CtaButtons";
import CatalogCard from "./CatalogCard";
import "./catalog.css";
import SmartPagination from "@/components/SmartPagination/SmartPagination";
function CatalogPage({ catalogs, pagination }) {
  return (
    <div>
      <CTAButtons />
      <div className="catalog-grid">
        {catalogs?.map((catalog) => (
          <CatalogCard key={catalog.id} catalog={catalog} />
        ))}
      </div>
      <SmartPagination paginationData={pagination} />
    </div>
  );
}

export default CatalogPage;
