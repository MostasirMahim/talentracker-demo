"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";

export default function ImagePostForm({ gallery }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const galleryIdFromUrl = searchParams.get("gallery_id");
  const apiEndpoint = "/api/gallery/v1/gallery/upload_images/";

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      gallery_id: galleryIdFromUrl || (gallery?.data?.[0]?.id ?? null),
    },
  });

  const [selectedGallery, setSelectedGallery] = useState(
    Number(galleryIdFromUrl) || gallery?.data?.[0]?.id || null
  );

  const [files, setFiles] = useState([]);
  const maxFiles = 10;

  const slotInputRefs = useRef([]);

  useEffect(() => {
    setValue("gallery_id", selectedGallery);
  }, [selectedGallery, setValue]);

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const handleAddFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    const remainingSlots = maxFiles - files.length;
    const toTake = incoming.slice(0, remainingSlots);

    const newFiles = toTake.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleReplaceAt = (index, fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;
    const f = incoming[0];

    setFiles((prev) => {
      const copy = [...prev];
      if (copy[index]) URL.revokeObjectURL(copy[index].preview);
      copy[index] = { file: f, preview: URL.createObjectURL(f) };
      return copy;
    });
  };

  const handleRemoveAt = (index) => {
    setFiles((prev) => {
      const copy = [...prev];
      if (copy[index]) URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      return copy;
    });
  };

  const onSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append("gallery", String(selectedGallery));
      files.forEach((fObj) => {
        fd.append("images", fObj.file);
      });


      const res = await axiosInstance.post(apiEndpoint, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Images uploaded successfully!");
      setFiles([]);
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Gallery dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery
          </label>

          <select
            value={selectedGallery ?? ""}
            onChange={(e) => setSelectedGallery(Number(e.target.value))}
            className="w-full p-3 rounded-md border border-gray-300 bg-white shadow-sm"
          >
            {gallery?.data?.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>

        {/* Image selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images (max {maxFiles})
          </label>

          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleAddFiles(e.target.files)}
            />
          </div>

          {/* Preview Grid */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {files.map((fObj, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden border"
              >
                <img src={fObj.preview} className="object-cover w-full h-40" />

                <div className="absolute bottom-2 left-2 right-2 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => slotInputRefs.current[idx]?.click()}
                    className="bg-white/90 font-bold px-2 cursor-pointer py-1 rounded-md shadow text-sm"
                  >
                    Replace
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveAt(idx)}
                    className="bg-red-600 font-bold cursor-pointer text-white px-2 py-1 rounded-md shadow text-sm"
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={(el) => (slotInputRefs.current[idx] = el)}
                  onChange={(e) => handleReplaceAt(idx, e.target.files)}
                />
              </div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: maxFiles - files.length }).map((_, i) => (
              <div
                key={i}
                className="border rounded-lg flex items-center justify-center h-40"
              >
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <span className="text-gray-400 text-4xl">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleAddFiles(e.target.files)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={files.length === 0}
            className="px-12 py-3 bg-blue-600 cursor-pointer font-bold text-white rounded-md shadow-md disabled:opacity-60"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}