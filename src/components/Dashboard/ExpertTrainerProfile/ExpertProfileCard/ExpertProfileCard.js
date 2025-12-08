"use client";
import React, { useState } from "react";
import { Trash2, Edit2, Link, Briefcase, FileText } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useExpertTrainerProfile } from "@/stores/expert_trainer_profile_dependencies_update_store";

// --- CUSTOM THEME COLORS ---
const PRIMARY_COLOR = "#1489bc"; // --mainColor
const DARK_PRIMARY_COLOR = "#0e4c89"; // --mainColor2
const TEXT_COLOR = "#262E2E"; // --blackColor
const OPTIONAL_TEXT_COLOR = "#666666"; // --optionalColor
const WHITE_COLOR = "#ffffff";

const ActionButton = ({
  onClick,
  icon: Icon,
  color,
  children,
  isPrimary = false,
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center space-x-2 py-2 px-3 text-sm font-semibold rounded-lg transition duration-200 shadow-md cursor-pointer
      ${
        isPrimary
          ? `bg-[${PRIMARY_COLOR}] hover:bg-[${DARK_PRIMARY_COLOR}] text-white`
          : `bg-gray-100 text-[${OPTIONAL_TEXT_COLOR}] hover:bg-gray-200 border border-gray-300`
      }
    `}
    style={{
      color: isPrimary ? WHITE_COLOR : OPTIONAL_TEXT_COLOR,
      backgroundColor: isPrimary ? PRIMARY_COLOR : "#f3f4f6", // Tailwind gray-100 equivalent
      borderColor: isPrimary ? "transparent" : "#d1d5db", // Tailwind gray-300 equivalent
    }}
  >
    <Icon size={18} className={isPrimary ? "text-white" : ""} />
    <span>{children}</span>
  </button>
);

const ProfileCard = ({ profile, onDelete, onUpdate }) => {
  const imageUrl =
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${profile.profile_picture}` ||
    `https://placehold.co/100x100/${PRIMARY_COLOR.replace(
      "#",
      ""
    )}/ffffff?text=E`;

  const expertiseArray = profile.specializations
    ? profile.specializations
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200">
      {/* Header and Profile Image */}
      <div className="p-6 md:p-8 flex flex-col items-center text-center">
        <Image
          src={imageUrl}
          alt={`Profile of ${profile.name}`}
          className="w-24 h-24 object-cover rounded-full border-4 shadow-md"
          style={{ borderColor: PRIMARY_COLOR }}
          width={100}
          height={100}
        />
        <h2 className="text-2xl font-bold mt-4" style={{ color: TEXT_COLOR }}>
          {profile.name}
        </h2>
        <p
          className="text-md font-medium mt-1"
          style={{ color: PRIMARY_COLOR }}
        >
          {profile.expertise}
        </p>
      </div>

      {/* Body Content */}
      <div className="px-6 pb-6 space-y-4">
        {/* Biography */}
        <div className="flex items-start">
          <FileText
            size={20}
            className="mt-1 shrink-0"
            style={{ color: PRIMARY_COLOR }}
          />
          <div className="ml-3">
            <p
              className="text-sm font-medium"
              style={{ color: OPTIONAL_TEXT_COLOR }}
            >
              Biography
            </p>
            <p className="text-sm mt-0.5" style={{ color: TEXT_COLOR }}>
              {profile.biography?.length > 150
                ? `${profile.biography.substring(0, 150)}...`
                : profile.biography}
            </p>
          </div>
        </div>

        {/* Specializations Tags */}
        <div className="flex items-start">
          <Briefcase
            size={20}
            className="mt-1 shrink-0"
            style={{ color: PRIMARY_COLOR }}
          />
          <div className="ml-3">
            <p
              className="text-sm font-medium mb-1"
              style={{ color: OPTIONAL_TEXT_COLOR }}
            >
              Specializations
            </p>
            <div className="flex flex-wrap gap-2">
              {expertiseArray.map((spec, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: PRIMARY_COLOR + "10",
                    color: DARK_PRIMARY_COLOR,
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {profile.linkedin_profile && (
            <a
              href={profile.linkedin_profile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm transition duration-200 hover:underline"
              style={{ color: DARK_PRIMARY_COLOR }}
            >
              <Link size={16} className="mr-1" /> LinkedIn
            </a>
          )}
          {profile.portfolio_link && (
            <a
              href={profile.portfolio_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm transition duration-200 hover:underline"
              style={{ color: DARK_PRIMARY_COLOR }}
            >
              <Link size={16} className="mr-1" /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Action Buttons (Footer) */}
      <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
        <ActionButton
          onClick={() => onUpdate(profile.id)}
          icon={Edit2}
          isPrimary
        >
          Update
        </ActionButton>
        <ActionButton
          onClick={() => onDelete(profile.id)}
          icon={Trash2}
          color="red"
        >
          Delete
        </ActionButton>
      </div>
    </div>
  );
};

const ExpertProfileList = ({ data }) => {
  const [profiles, setProfiles] = useState(data);
  const router = useRouter();
  const setProfile = useExpertTrainerProfile((state) => state.setProfile);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete the profile?`)) {
      try {
        const response = await axiosInstance.delete(
          `/api/expert_trainer_profiles/v1/expert_trainer_profiles/${id}/`
        );
        if (response.status == 200) {
          toast.success("Deleted Successfully");
          setProfiles((prev) => prev.filter((p) => p.id !== id));
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Error deleting profile");
      }
    }
  };

  const handleUpdate = (id) => {
    setProfile(profiles.find((p) => p.id === id));
    router.push(`/dashboard/expert_trainer_profiles/create/?id=${id}`);
  };

  return (
    <div
      className="min-h-screen p-4 md:p-10"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <h1
        className="text-4xl font-extrabold text-center mb-10"
        style={{ color: DARK_PRIMARY_COLOR }}
      >
        Expert Trainer Profiles ({profiles?.length})
      </h1>

      {profiles?.length === 0 ? (
        <div
          className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl"
          style={{ color: OPTIONAL_TEXT_COLOR }}
        >
          <p className="text-xl font-semibold">No expert profiles found.</p>
        </div>
      ) : (
        /* Responsive Grid Container */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {profiles?.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertProfileList;
