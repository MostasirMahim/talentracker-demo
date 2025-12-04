"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import axiosInstance from "@/lib/axiosIntance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LearningSegmentList({ data, pagination }) {
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  const handleUpdate = (id) => {
    router.push("/dashboard/learning_segment/create/?segment_id=" + id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await axiosInstance.delete(
          `/api/learning_segments/v1/learning_segments/${id}/`
        );
        if (response.status == 200) {
          toast.success("Deleted successfully");
          setSelectedId(null);
          router.refresh();
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4 text-mainColor">
        Learning Segments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.thumbnail}`}
              alt={item.program_title}
              className="w-full h-40 object-cover"
              height={100}
              width={100}
            />

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {item.program_title}
              </h3>

              <p className="text-sm text-gray-500">Category: {item.category}</p>
              <p className="text-sm text-gray-500 truncate">
                ID: {item.learning_id}
              </p>

              <div className="flex justify-between items-center pt-3">
                <button
                  className="flex items-center gap-2 text-white bg-blue-600 px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleUpdate(item.id)}
                >
                  <Pencil size={16} /> Update
                </button>

                <button
                  className="flex items-center gap-2 text-white bg-red-600 px-3 py-1.5 text-sm rounded-lg hover:bg-red-700 transition"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminSmartPagination paginationData={pagination} />
    </div>
  );
}
