"use client";
import axiosInstance from "@/lib/axiosIntance";
import { Download } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

function ResumeButton({id, doc}) {
  const handleDownloadResume = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/candidates/v1/candidates/download_resume/${id}/`,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        // Extract filename if provided by the backend
        const contentDisposition = response.headers["content-disposition"];

        let fileName = "resume.pdf";
        if (contentDisposition) {
          const fileNameMatch =
            contentDisposition.match(/filename="?([^"]+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        // Create a blob URL and trigger the download
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Resume downloaded successfully");
      }
    } catch (error) {
      console.log(error, "error");
      // If the request itself failed (network/server)
      if (error?.response && error?.response?.data instanceof Blob) {
        try {
          // Try to parse blob to JSON
          const text = await error.response.data.text();
          const json = JSON.parse(text);

          if (json.errors) {
            Object.keys(json.errors).forEach((field) => {
              toast.error(`${field}: ${json.errors[field][0]}`);
            });
          } else {
            toast.error(json.message || "Error while downloading file.");
          }
        } catch {
          toast.error("Unexpected error while parsing server response.");
        }
      } else {
        toast.error(
          error.response?.data?.message || "Network error. Please try again."
        );
      }
    }
  };
  return (
    <div className="document-row">
      <div className="document-label-with-icon">
        <Download className="icon-md" />
        <span>Resume</span>
      </div>
      <a onClick={() => handleDownloadResume()} className="document-link">
        {doc ? doc?.resume.split("/").pop() : "N/A"}
      </a>
    </div>
  );
}

export default ResumeButton;
