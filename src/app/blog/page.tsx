import { BlogBanner, BlogBannerSkeleton } from "@/components/blog-banner";
import CategoryBanner, {
  CategoryBannerSkeleton,
} from "@/components/category-banner";
import React, { Suspense } from "react";

const Blog = async () => {
  return (
    <main className="flex w-full max-w-[1440px] self-center flex-1 flex-col flex-wrap h-auto gap-2 px-5 md:px-10 mt-10">
      <Suspense fallback={<BlogBannerSkeleton />}>
        {(async function () {
          return <BlogBanner />;
        })()}
      </Suspense>
      <Suspense fallback={<CategoryBannerSkeleton />}>
        {(async function () {
          return <CategoryBanner />;
        })()}
      </Suspense>
    </main>
  );
};

export default Blog;
