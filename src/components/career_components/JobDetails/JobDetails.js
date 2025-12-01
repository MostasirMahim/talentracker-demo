"use client";

import {
  Briefcase,
  MapPin,
  Calendar,
  Wallet,
  CalendarArrowUp,
} from "lucide-react";
import Image from "next/image";
import "./JobDetails.css";
import { toast } from "react-toastify";
import { job_Apply } from "@/actions/jobs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get_me } from "@/actions/auth";
import { AlertModal } from "../alert_modal/AlertModal";

export default function JobDetails({ job }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const user = data?.error === false ? true : "";
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFetchData = async () => {
    const fetchedData = await get_me();
    setData(fetchedData);
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  const onApply = async () => {
    if (!user) {
      toast.error("You must be logged in to apply for a job");
      router.push("/auth/candidate/login");
      return;
    }
    setIsLoading(true);
    try {
      if (!job?.id) {
        return;
      }
      const formData = {
        job: job.id,
      };
      const result = await job_Apply(formData);
      if (result.success) {
        toast.success("Job applied successfully");
      } else {
        toast.error(result.message);
        console.log(result.data);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    onApply();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!job) return null;
  return (
    <div className="container my-5">
      <div className="card border-0 shadow-sm job-detail-card p-4">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="d-flex align-items-start gap-3">
            <Image
              src="https://www.searchenginejournal.com/wp-content/uploads/2017/06/shutterstock_268688447.jpg"
              alt="Company Logo"
              width={90}
              height={90}
              className="rounded job-detail-logo"
            />
            <div>
              <h2 className="fw-bold text-main mb-1">{job.title}</h2>
              <div className="text-muted mt-2 small d-flex flex-wrap gap-3">
                <span className="minimal-badge badge-type">
                  <Briefcase size={14} /> {job.job_type?.name}
                </span>

                <span className="minimal-badge badge-location">
                  <MapPin size={14} /> {job.job_location?.city},{" "}
                  {job.job_location?.country}
                </span>
                <span className="minimal-badge badge-deadline">
                  <CalendarArrowUp size={14} /> Deadline: {job.deadline}
                </span>
              </div>
            </div>
          </div>

          <div className="text-md-end mt-3 mt-md-0">
            <span className="badge bg-main text-white fs-6 px-3 py-2">
              {job.job_category?.name}
            </span>
          </div>
        </div>

        {/* Salary & Meta */}
        <div className="mb-4 border-top border-bottom py-3 d-flex flex-wrap gap-4">
          <div className="d-flex align-items-center text-secondary minimal-badge badge-salary">
            <Wallet size={18} className="me-2 text-main" />
            <strong className="me-1 ">Salary:</strong> {job.salary}
          </div>
          <div className="d-flex align-items-center minimal-badge badge-date text-secondary">
            <Calendar size={18} className="me-2 text-main" />
            <strong className="me-1">Posted:</strong>{" "}
            {new Date(job.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Job Body (Rich Text) */}
        <div
          className="job-body text-secondary"
          dangerouslySetInnerHTML={{ __html: job.body }}
        />

        {/* Apply Button */}
        <div className="text-center mt-5">
          <button onClick={() => setIsModalOpen(true)} className="default-btn">
            {isLoading ? "Applying..." : "Apply Now"}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
      <AlertModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Confirm"
      />
    </div>
  );
}
