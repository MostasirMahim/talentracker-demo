import Loader from "@/components/Loaders/Loader/Loader";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-50">
      <Loader/>
      
    </div>
  );
}
