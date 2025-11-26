import axiosInstance from "@/lib/axiosIntance";
import { AlertCircle } from "lucide-react";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import Footer from "@/components/Layouts/Footer";
import NewsDetails from "@/components/News/NewsDetails";

export default async function SingleNewsPage({ params }) {
  let blog = null;
  try {
    const { data } = await axiosInstance.get(`/api/news/v1/news/${params.id}/`);
    blog = data.data;
  } catch (error) {
    console.error(`Failed to fetch blog ID: ${params.id}`, error);
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          Blog Not Found
        </h2>
        <p className="text-gray-600 max-w-md">
          We couldn’t find the blog you’re looking for. It might have been
          removed, or the ID <span className="font-mono">{params.id}</span> is
          invalid.
        </p>
        <a
          href="/blog/all"
          className="mt-6 inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Back to Blogs
        </a>
      </div>
    );
  }

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <NewsDetails blog={blog} />
      <Footer />
    </>
  );
}
