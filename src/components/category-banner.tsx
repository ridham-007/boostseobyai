"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
const AdCustom = dynamic(() => import("./AdCustom"), { ssr: false });

import { info } from "@/utils/ads";
import { useEffect, useState } from "react";
import { ActionResponse } from "@/type-identifier";
import ImageWithFallback from "./image-with-fallback";

export default function CategoryBanner() {
  const [articles, setArticles] = useState<any[]>([]);

  const getArticleList = async (type: string): Promise<void> => {
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/common/article/${process.env.NEXT_PUBLIC_SITE_ID}/${type}/20`,
        {
          cache: "no-store",
        }
      );

      const responseData = await res.json();
      const { articles = [] } = responseData;
      setArticles(articles);
    } catch (error) {
      console.log({ error });
      setArticles(articles);
    }
  };

  useEffect(() => {
    getArticleList("recent");
  }, []);

  return (
    <>
      {articles.length ? (
        <>
          <div className="flex w-full flex-wrap justify-between gap-2 h-fit blog-list bg-white">
            {articles.slice(5).map((item: any, index: any) => {
              return (
                <Link
                  href={`/blog/${item?.slug}`}
                  target="_blank"
                  prefetch={false}
                  key={`CategoryWiseTopNews-${index}`}
                  className="flex flex-col flex-1 lg:basis-[32%] sm:basis-[49%] basis-[100%] lg:max-w-[32%] sm:max-w-[49%] cursor-pointer p-1 rounded-sm"
                  // onClick={() => handleArticleOpen(item)}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      location.href = `/blog/${item.slug}`;
                    }
                  }}
                >
                  <div className="flex flex-col basis-[90%] flex-1 px-2 py-3 space-y-1.5">
                    <div className="flex basis-[70%] flex-1 flex-col font-semibold leading-none tracking-tight">
                      <div className="block w-full h-full relative">
                        <ImageWithFallback
                          alt={`CategoryWiseTopNews-${index}-alt`}
                          src={item?.featureImage}
                        ></ImageWithFallback>
                      </div>
                    </div>
                    {item.description && (
                      <div className="flex w-[100%] text-sm text-foreground text-ellipsis line-clamp-3 text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <div className="flex text-[16px] text-foreground font-medium overflow-hidden px-2 pb-2">
                    <div className="line-clamp-2 text-sm text-muted-foreground">
                      {item?.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <AdCustom
            dataAdId={info.RESPONSIVE_ADS_1.id}
            width={info.RESPONSIVE_ADS_1.width}
            height={info.RESPONSIVE_ADS_1.height}
          />
        </>
      ) : (
        <CategoryBannerSkeleton />
      )}
    </>
  );
}

export function CategoryBannerSkeleton() {
  return (
    <div className="flex w-full flex-wrap justify-start gap-2">
      {Array(10)
        .fill(null)
        .map((item, index) => {
          return (
            <div
              key={`CategoryWiseTopNews-${index}`}
              className="flex flex-col flex-1 lg:basis-[32%] sm:basis-[49%] basis-[100%] lg:max-w-[32%] sm:max-w-[49%] cursor-pointer p-1 rounded-sm border bg-card text-card-foreground  bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" 
            >
              <div className="flex flex-col basis-[90%] flex-1 px-2 py-3 space-y-1.5">
                <div className="flex basis-[70%] flex-1 flex-col font-semibold leading-none tracking-tight">
                  <div className="block w-full h-full relative">
                    <ImageWithFallback
                      alt={`CategoryWiseTopNews-${index}-alt`}
                      src={item?.image}
                    ></ImageWithFallback>
                  </div>
                </div>
                <div className="flex flex-col gap-2 basis-[30%] w-[100%] overflow-hidden py-[2px]">
                  <div className="w-full h-5 bg-gray-300 animate-pulse rounded-sm"></div>
                  <div className="w-full h-5 bg-gray-300 animate-pulse rounded-sm"></div>
                  <div className="w-full h-5 bg-gray-300 animate-pulse rounded-sm"></div>
                </div>
              </div>
              <div className="flex basis-[10%] px-2">
                <div className="w-full h-5  bg-gray-300 animate-pulse rounded-sm"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
