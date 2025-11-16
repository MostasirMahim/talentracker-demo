import React from "react";

export default function ContactDetails({ contact }) {
  if (!contact) return null;

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Contact Information
      </h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Full Name */}
        <Card label="Full Name" value={contact.full_name} />

        {/* Company */}
        <Card label="Company" value={contact.company} />

        {/* Email */}
        <Card label="Email" value={contact.email} />

        {/* Phone Number */}
        <Card label="Phone Number" value={contact.phone_number} />

        {/* Subject */}
        <Card label="Subject" value={contact.subject} />

        {/* Status */}
        <Card 
          label="Status" 
          value={contact.status} 
          valueClass="capitalize font-semibold text-blue-600"
        />
        {/* is active */}
        <Card 
          label="Is Active" 
          value={contact.is_active} 
          valueClass="capitalize font-semibold text-blue-600"
        />

        {/* Created At */}
        <Card label="Created At" value={formatDate(contact.created_at)} />

        {/* Updated At */}
        <Card label="Updated At" value={formatDate(contact.updated_at)} />
      </div>

      {/* Message Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Message</h2>

        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <p className="text-gray-600 leading-relaxed">{contact.message}</p>
        </div>
      </div>
    </div>
  );
}

/* --- Small Card Component --- */
function Card({ label, value, valueClass = "" }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-lg font-medium text-gray-800 mt-1 ${valueClass}`}>
        {typeof value === "boolean" ? (value ? "True" : "False") : value || "—"}
      </h3>
    </div>
  );
}


/* --- Date Format Helper --- */
function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
