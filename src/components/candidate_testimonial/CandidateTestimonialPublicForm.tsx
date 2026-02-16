'use client';

import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosIntance';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function CandidateTestimonialPublicForm() {
  const primaryColor = "rgb(20, 138, 188)";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedRating, setSelectedRating] = useState(5); // Default to 5 stars
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: '',
      company_name: '',
      designation: '',
      message: '',
      rating: '5'
    }
  });

  // Rating options
  const ratingOptions = [
    { value: 5, label: '5 Stars - Excellent', stars: 5 },
    { value: 4, label: '4 Stars - Very Good', stars: 4 },
    { value: 3, label: '3 Stars - Good', stars: 3 },
    { value: 2, label: '2 Stars - Fair', stars: 2 },
    { value: 1, label: '1 Star - Poor', stars: 1 },
  ];

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        e.target.value = '';
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('full_name', data.full_name);
      formData.append('company_name', data.company_name);
      formData.append('designation', data.designation);
      formData.append('message', data.message);
      formData.append('rating', data.rating); // Add rating to form data
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await axiosInstance.post(
        '/api/candidates/v1/candidates/testimonials/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data?.code === 201 || response.status === 201) {
        toast.success('Your testimonial has been submitted successfully!');
        reset();
        setSelectedFile(null);
        setPreviewUrl(null);
        setSelectedRating(5); // Reset to default
      } else {
        toast.error(response.data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      
      // Handle backend validation errors - ONLY in toast, not under fields
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        
        // Show each field error in toast only
        Object.keys(backendErrors).forEach(field => {
          const messages = backendErrors[field];
          const message = Array.isArray(messages) ? messages[0] : messages;
          
          // Show toast for each field error (no setError)
          toast.error(`${field.replace('_', ' ')}: ${message}`);
        });
      } 
      // Handle general error message
      else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      // Handle 500 server error
      else if (error.response?.data?.errors?.server_error) {
        toast.error('Server error occurred. Please try again later.');
      }
      else {
        toast.error('Failed to submit testimonial. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Star display component
  const StarRating = ({ rating }) => {
    return (
      <div className="d-flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={star <= rating ? primaryColor : "none"}
            stroke={primaryColor}
            strokeWidth="1.5"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-5 py-lg-6 tpf-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Header */}
            <div className="text-center mb-5 tpf-header">
              <div 
                className="tpf-icon-wrapper mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  background: `rgba(20, 138, 188, 0.1)`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={primaryColor} strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              
              <h2 className="display-6 fw-bold mb-3 tpf-title">
                Share Your <span style={{ color: primaryColor }}>Success Story</span>
              </h2>
              
              <p className="text-secondary tpf-description" style={{ color: "#6c757d", maxWidth: "500px", margin: "0 auto" }}>
                Your journey can inspire others. Tell us how our platform helped you achieve your goals.
              </p>
            </div>

            {/* Form Card */}
            <div className="card border-0 shadow-sm tpf-card">
              <div className="card-body p-4 p-lg-5">
                <form onSubmit={handleSubmit(onSubmit)} className="tpf-form" encType="multipart/form-data">
                  {/* Full Name */}
                  <div className="mb-4 tpf-field">
                    <label className="form-label fw-semibold tpf-label" style={{ color: "#1a2634" }}>
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <div className="tpf-input-wrapper position-relative">
                      <span className="position-absolute top-50 translate-middle-y tpf-input-icon" style={{ left: "15px", color: primaryColor }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control tpf-input"
                        placeholder="Enter your full name"
                        style={{ paddingLeft: "45px", height: "50px" }}
                        {...register('full_name')}
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="mb-4 tpf-field">
                    <label className="form-label fw-semibold tpf-label" style={{ color: "#1a2634" }}>
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <div className="tpf-input-wrapper position-relative">
                      <span className="position-absolute top-50 translate-middle-y tpf-input-icon" style={{ left: "15px", color: primaryColor }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control tpf-input"
                        placeholder="Enter your company name"
                        style={{ paddingLeft: "45px", height: "50px" }}
                        {...register('company_name')}
                      />
                    </div>
                  </div>

                  {/* Designation */}
                  <div className="mb-4 tpf-field">
                    <label className="form-label fw-semibold tpf-label" style={{ color: "#1a2634" }}>
                      Designation <span className="text-danger">*</span>
                    </label>
                    <div className="tpf-input-wrapper position-relative">
                      <span className="position-absolute top-50 translate-middle-y tpf-input-icon" style={{ left: "15px", color: primaryColor }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2a10 10 0 0 1 10 10c0 4.42-2.58 8-6 10" />
                          <path d="M2 12c0-4.42 2.58-8 6-10" />
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 22v-6" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control tpf-input"
                        placeholder="Enter your designation (e.g., Software Developer)"
                        style={{ paddingLeft: "45px", height: "50px" }}
                        {...register('designation')}
                      />
                    </div>
                  </div>

                  {/* Rating Field - New */}
                  <div className="mb-4 tpf-field">
                    <label className="form-label fw-semibold tpf-label" style={{ color: "#1a2634" }}>
                      Your Rating <span className="text-danger">*</span>
                    </label>
                    <div className="tpf-rating-wrapper">
                      {/* Custom Star Rating Dropdown */}
                      <div className="position-relative">
                        <select
                          className="form-select tpf-select"
                          style={{
                            height: "50px",
                            paddingLeft: "45px",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(primaryColor)}' strokeWidth='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "16px",
                          }}
                          {...register('rating')}
                          onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                        >
                          {ratingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        
                        {/* Star Icon */}
                        <span className="position-absolute top-50 translate-middle-y tpf-select-icon" style={{ left: "15px", color: primaryColor }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                          </svg>
                        </span>
                      </div>

                      {/* Live Star Preview */}
                      <div className="mt-2 d-flex align-items-center gap-2 tpf-rating-preview">
                        <span className="small text-muted">Your selection:</span>
                        <StarRating rating={selectedRating} />
                        <span className="small fw-semibold" style={{ color: primaryColor }}>
                          ({selectedRating} Star{selectedRating > 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-4 tpf-field">
                    <label className="form-label fw-semibold tpf-label" style={{ color: "#1a2634" }}>
                      Your Story <span className="text-danger">*</span>
                    </label>
                    <div className="tpf-input-wrapper position-relative">
                      <span className="position-absolute tpf-textarea-icon" style={{ left: "15px", top: "15px", color: primaryColor }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </span>
                      <textarea
                        className="form-control tpf-textarea"
                        placeholder="Share your experience... (Minimum 100 characters)"
                        rows={5}
                        style={{ paddingLeft: "45px", paddingTop: "15px" }}
                        {...register('message')}
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4 tpf-field">
                    <label className="form-label fw-semibold tpf-label" style={{ color: "#1a2634" }}>
                      Your Photo <span className="text-danger">*</span>
                    </label>
                    
                    <div className="tpf-upload-wrapper">
                      {/* Preview */}
                      {previewUrl && (
                        <div className="mb-3 tpf-preview">
                          <div className="position-relative d-inline-block">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: `3px solid ${primaryColor}`,
                              }}
                            />
                            <button
                              type="button"
                              className="position-absolute top-0 end-0 btn btn-sm btn-danger rounded-circle p-1 tpf-remove-btn"
                              style={{ transform: "translate(25%, -25%)" }}
                              onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl(null);
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Upload Area */}
                      <div className="tpf-upload-area">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          className="d-none"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="image-upload"
                          className="tpf-upload-label"
                          style={{
                            border: `2px dashed ${primaryColor}40`,
                            borderRadius: "12px",
                            padding: "20px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={primaryColor} strokeWidth="2">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                          <span style={{ color: primaryColor }}>
                            {selectedFile ? selectedFile.name : 'Click to upload your photo'}
                          </span>
                        </label>
                      </div>
                      <small className="text-muted d-block mt-2">
                        Supported formats: JPG, PNG, GIF (Max 5MB). Required field.
                      </small>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-5 tpf-submit">
                    <button
                      type="submit"
                      className="btn btn-lg w-100 tpf-submit-btn"
                      disabled={isSubmitting}
                      style={{
                        background: primaryColor,
                        color: "white",
                        border: "none",
                        padding: "14px",
                        borderRadius: "50px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSubmitting ? (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Submitting...
                        </span>
                      ) : (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Submit Your Story
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Note */}
                  <p className="text-center text-muted small mt-4 mb-0 tpf-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    Your story will be reviewed before publishing. No login required.
                  </p>
                </form>
              </div>
            </div>

            {/* Back Link */}
            <div className="text-center mt-4 tpf-back-link">
              <Link 
                href="/candidate_testimonial"
                className="text-decoration-none"
                style={{ color: primaryColor }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to testimonials
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* Testimonial Public Form Styles - All prefixed with tpf- */
          .tpf-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            min-height: calc(100vh - 400px);
          }

          .tpf-card {
            border-radius: 24px !important;
            overflow: hidden;
            transition: transform 0.3s ease;
          }

          .tpf-card:hover {
            transform: translateY(-5px);
          }

          .tpf-input,
          .tpf-textarea,
          .tpf-select {
            border: 1.5px solid #e9ecef;
            border-radius: 12px;
            transition: all 0.3s ease;
          }

          .tpf-input:focus,
          .tpf-textarea:focus,
          .tpf-select:focus {
            border-color: ${primaryColor};
            box-shadow: 0 0 0 3px rgba(20, 138, 188, 0.1);
          }

          .tpf-select {
            cursor: pointer;
            background-color: white;
          }

          .tpf-select option {
            padding: 10px;
          }

          .tpf-input-icon,
          .tpf-textarea-icon,
          .tpf-select-icon {
            transition: transform 0.3s ease;
          }

          .tpf-input:focus + .tpf-input-icon,
          .tpf-textarea:focus ~ .tpf-textarea-icon,
          .tpf-select:focus + .tpf-select-icon {
            transform: translateY(-50%) scale(1.1);
          }

          .tpf-upload-label {
            transition: all 0.3s ease;
          }

          .tpf-upload-label:hover {
            background: rgba(20, 138, 188, 0.05);
            border-color: ${primaryColor} !important;
          }

          .tpf-remove-btn {
            transition: all 0.3s ease;
          }

          .tpf-remove-btn:hover {
            transform: translate(25%, -25%) scale(1.1) !important;
          }

          .tpf-submit-btn {
            position: relative;
            overflow: hidden;
          }

          .tpf-submit-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
            pointer-events: none;
          }

          .tpf-submit-btn:hover::after {
            width: 300px;
            height: 300px;
          }

          .tpf-header {
            animation: tpfFadeInDown 0.8s ease-out;
          }

          .tpf-card {
            animation: tpfFadeInUp 0.8s ease-out;
          }

          .tpf-rating-preview {
            animation: tpfSlideIn 0.3s ease-out;
          }

          @keyframes tpfFadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes tpfFadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes tpfSlideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (max-width: 768px) {
            .tpf-card {
              margin: 0 15px;
            }
          }
        `
      }} />
    </section>
  );
}