"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useTrainingDetail } from "@/stores/training_solution_store";
import {
  createTrainingDetail,
  updateTrainingDetail,
} from "@/services/TrainingDetailService";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosIntance";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function TrainingDetailPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const detail_id = searchParams.get("detail_id");

  const { trainingDetail, clearTrainingDetail } = useTrainingDetail();

  // Form state
  const [formData, setFormData] = useState({
    expert_trainer_profile: "",
    training_catalog: "",
    full_description: "",
    full_curriculum: "",
    duration: "",
    delivery_mode: "",
    target_audience: "",
    cta_request_link: "",
    cta_enroll_link: "",
  });

  // Dropdown data
  const [expertTrainers, setExpertTrainers] = useState([]);
  const [trainingCatalogs, setTrainingCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quillLoaded, setQuillLoaded] = useState(false);

  // ReactQuill modules (excluding image/video)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  // Fetch expert trainers
  const fetchExpertTrainers = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/expert_trainer_profiles/v1/expert_trainer_profiles/"
      );
      setExpertTrainers(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load expert trainers");
      console.error(error);
    }
  };

  // Fetch training catalogs
  const fetchTrainingCatalogs = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/training_solutions/v1/training_catalog/"
      );
      setTrainingCatalogs(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load training catalogs");
      console.error(error);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchExpertTrainers(), fetchTrainingCatalogs()]);
      setQuillLoaded(true);
      setLoading(false);
    };
    loadData();
  }, []);

  // Populate form if editing - runs after data is loaded
  useEffect(() => {
    if (
      !loading &&
      detail_id &&
      trainingDetail &&
      Object.keys(trainingDetail).length > 0
    ) {
      console.log("Populating form with:", trainingDetail);

      setFormData({
        expert_trainer_profile: parseInt(
          trainingDetail.expert_trainer_profile.id || ""
        ),
        training_catalog: parseInt(trainingDetail.training_catalog.id || ""),
        full_description: trainingDetail.full_description || "",
        full_curriculum: trainingDetail.full_curriculum || "",
        duration: trainingDetail.duration || "",
        delivery_mode: trainingDetail.delivery_mode || "",
        target_audience: trainingDetail.target_audience || "",
        cta_request_link: trainingDetail.cta_request_link || "",
        cta_enroll_link: trainingDetail.cta_enroll_link || "",
      });
    }
  }, [loading, detail_id, trainingDetail]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ReactQuill change
  const handleQuillChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.expert_trainer_profile) {
      toast.error("Expert Trainer is required");
      return false;
    }
    if (!formData.training_catalog) {
      toast.error("Training Catalog is required");
      return false;
    }

    // Strip HTML tags for validation
    const stripHtml = (html) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    if (!stripHtml(formData.full_description).trim()) {
      toast.error("Full Description is required");
      return false;
    }
    if (!stripHtml(formData.full_curriculum).trim()) {
      toast.error("Full Curriculum is required");
      return false;
    }
    if (!formData.duration?.trim()) {
      toast.error("Duration is required");
      return false;
    }
    if (!formData.delivery_mode?.trim()) {
      toast.error("Delivery Mode is required");
      return false;
    }
    if (!formData.target_audience?.trim()) {
      toast.error("Target Audience is required");
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const payload = {
        expert_trainer_profile: parseInt(formData.expert_trainer_profile),
        training_catalog: parseInt(formData.training_catalog),
        full_description: formData.full_description,
        full_curriculum: formData.full_curriculum,
        duration: formData.duration,
        delivery_mode: formData.delivery_mode,
        target_audience: formData.target_audience,
        cta_request_link: formData.cta_request_link || undefined,
        cta_enroll_link: formData.cta_enroll_link || undefined,
      };

      if (detail_id) {
        // Update existing
        await updateTrainingDetail(detail_id, payload);
        toast.success("Training Detail updated successfully");
      } else {
        // Create new
        await createTrainingDetail(payload);
        toast.success("Training Detail created successfully");
      }

      clearTrainingDetail();
      router.push("/dashboard/training_solutions/training_detail/");
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;

        Object.keys(backendErrors).forEach((field) => {
          backendErrors[field].forEach((msg) => {
            toast.error(`${msg}`);
          });
        });

        return;
      }
      toast.error(
        detail_id
          ? "Failed to update training detail"
          : "Failed to create training detail"
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    clearTrainingDetail();
    router.push("/dashboard/training_solutions/training_detail/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {detail_id ? "Edit Training Detail" : "Create Training Detail"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Expert Trainer Profile */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Expert Trainer Profile <span className="text-red-500">*</span>
          </label>
          <select
            name="expert_trainer_profile"
            value={formData.expert_trainer_profile}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {expertTrainers.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Training Catalog */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Training Catalog <span className="text-red-500">*</span>
          </label>
          <select
            name="training_catalog"
            value={formData.training_catalog}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {/* <option value="">Select Training Catalog</option> */}
            {trainingCatalogs.map((catalog) => (
              <option key={catalog.id} value={String(catalog.id)}>
                {catalog.title} ({catalog.training_id})
              </option>
            ))}
          </select>
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Description <span className="text-red-500">*</span>
          </label>
          {quillLoaded && (
            <ReactQuill
              theme="snow"
              value={formData.full_description}
              onChange={(value) => handleQuillChange("full_description", value)}
              modules={modules}
              className="bg-white"
            />
          )}
        </div>

        {/* Full Curriculum */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Curriculum <span className="text-red-500">*</span>
          </label>
          {quillLoaded && (
            <ReactQuill
              theme="snow"
              value={formData.full_curriculum}
              onChange={(value) => handleQuillChange("full_curriculum", value)}
              modules={modules}
              className="bg-white"
            />
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Duration <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 1 Day"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Delivery Mode */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Delivery Mode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="delivery_mode"
            value={formData.delivery_mode}
            onChange={handleChange}
            placeholder="e.g., On-Site, Online"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Target Audience <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            placeholder="e.g., Analysts, Officers"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* CTA Request Link (Optional) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            CTA Request Link (Optional)
          </label>
          <input
            type="url"
            name="cta_request_link"
            value={formData.cta_request_link}
            onChange={handleChange}
            placeholder="https://example.com/request"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CTA Enroll Link (Optional) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            CTA Enroll Link (Optional)
          </label>
          <input
            type="url"
            name="cta_enroll_link"
            value={formData.cta_enroll_link}
            onChange={handleChange}
            placeholder="https://example.com/enroll"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting
              ? "Submitting..."
              : detail_id
              ? "Update Detail"
              : "Create Detail"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
