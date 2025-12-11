"use client";
import React from "react";
import { ExternalLink, User, Briefcase, Calendar, Globe } from "lucide-react";
import NextLink from "next/link";

export default function TrainersDetails({ trainer }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">

      {/* Back Button */}
      <NextLink
        href="/dashboard/training_solutions/trainers/"
        className="inline-block mb-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        ← Back to List
      </NextLink>

      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 sm:p-8 text-white">

        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-5 gap-3">
          <div className="bg-white/20 p-4 rounded-full">
            <User size={40} />
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              {trainer.full_name}
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-1">
              {trainer.field_of_specialization}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start gap-3">
            <Globe size={20} />
            <div>
              <p className="text-blue-100 text-sm">Email</p>
              <p className="font-medium break-all">{trainer.user}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ExternalLink size={20} />
            <div>
              <p className="text-blue-100 text-sm">LinkedIn Profile</p>
              <a
                href={trainer.linked_profile}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium"
              >
                View Profile →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={22} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Created</h3>
          </div>
          <p className="text-gray-600">{formatDate(trainer.created_at)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={22} className="text-green-600" />
            <h3 className="font-semibold text-gray-800">Last Updated</h3>
          </div>
          <p className="text-gray-600">{formatDate(trainer.updated_at)}</p>
        </div>
      </div>

      {/* PORTFOLIO SECTION */}
      <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 mt-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Briefcase size={26} className="text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Portfolio Projects
          </h2>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {trainer.portfolios.length} Projects
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainer.portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {portfolio.title}
                </h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  #{portfolio.id}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-3">
                {formatDate(portfolio.created_at)}
              </p>

              <a
                href={portfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
              >
                <ExternalLink size={16} />
                Visit Project
              </a>
            </div>
          ))}
        </div>

        {trainer.portfolios.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <Briefcase size={48} className="mx-auto opacity-30 mb-3" />
            <p>No portfolio projects available</p>
          </div>
        )}
      </div>
    </div>
  );
}
