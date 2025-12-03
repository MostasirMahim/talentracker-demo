import { cookies } from "next/headers";
import axiosInstance from "@/lib/axiosIntance";
import { AlertCircle } from "lucide-react";
import BlogDetailsContent from "@/components/Blog/BlogDetailsContent";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import Footer from "@/components/Layouts/Footer";

export default async function SingleBlogPage({ params } ) {
  console.log(params);
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  let blog = null;

  try {
    const { data } = await axiosInstance.get(
      `/api/blogs/v1/blogs/${params.id}/`
      
    );
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
          removed, or the ID <span className="font-mono">{params.id}</span> is invalid.
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
      

      
      <BlogDetailsContent blog={blog} />
    

      <Footer />
    </>
  );
}
