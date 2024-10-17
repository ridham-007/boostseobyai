import { info } from "@/utils/ads";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import ShowArticle, { ArticleSkeleton } from "@/components/show-article";
import DynamicNewsWall, {
  DynamicNewsWallSkeleton,
} from "@/components/blog-banner-side";
const AdCustom = dynamic(() => import("@/components/AdCustom"), { ssr: false });
export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { slug: string[] };
    searchParams: { [key: string]: string | string[] | undefined };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/common/meta-data/${process.env.NEXT_PUBLIC_SITE_ID}/${slug}`,
      {
        next: { revalidate: 10 },
      }
    );
    const responseData = await res.json();
    const { metaData } = responseData?.data;
    return {
      title:
        ((metaData?.openGraph?.title ||
          metaData?.openGraph?.ogTitle ||
          metaData?.name ||
          metaData?.title) &&
          (metaData?.openGraph?.title ||
            metaData?.openGraph?.ogTitle ||
            metaData?.name ||
            metaData?.title)) ||
        "AI Text Humanizer",
      description:
        metaData?.seo_description ||
        metaData?.description ||
        "AI Text Humanizer",
      keywords: metaData?.keywords && [metaData?.keywords?.split(",")],
      openGraph: {
        ...((metaData?.openGraph?.title || metaData?.openGraph?.ogTitle) && {
          title: metaData?.openGraph?.title || metaData?.openGraph?.ogTitle,
        }),
        ...((metaData?.openGraph?.description ||
          metaData?.openGraph?.ogDescription) && {
          description:
            metaData?.openGraph?.description ||
            metaData?.openGraph?.ogDescription,
        }),
        ...((metaData?.openGraph?.url || metaData?.openGraph?.ogUrl) && {
          url: metaData?.openGraph?.url || metaData?.openGraph?.ogUrl,
        }),
        ...((metaData?.openGraph?.type || metaData?.openGraph?.ogType) && {
          type: metaData?.openGraph?.type || metaData?.openGraph?.ogType || "",
        }),
        ...((metaData?.openGraph?.locale || metaData?.openGraph?.ogLocale) && {
          locale: metaData?.openGraph?.locale || metaData?.openGraph?.ogLocale,
        }),
        ...((metaData?.openGraph?.site_name ||
          metaData?.openGraph?.ogSiteName) && {
          siteName:
            metaData?.openGraph?.site_name || metaData?.openGraph?.ogSiteName,
        }),
        images: [
          {
            url: metaData?.openGraph?.ogImage || "",
          },
        ],
      },
      twitter: {
        title: "",
        description: "",
        images: "",
      },
      alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL,
      },
    };
  } catch (e) {
    return {
      title: "AI Text Humanizer for Free | The Best AI HumanText Converter",
      description:
        "Ai Text Humanize is an online, free AI text converter that turns the AI generated text into a human readable text and best plagiarism remover.",
      keywords:
        "Humanize AI Text, Humanize AI, AI Text Converter, AI to Human Text Converter, Bypass AI Detector, Convert AI Text",
      openGraph: {
        url: process.env.NEXT_PUBLIC_SITE_URL,
        type: "website",
        title: "AI Text Humanizer for Free | The Best AI HumanText Converter",
        description:
          "Ai Text Humanize is an online, free AI text converter that turns the AI generated text into a human readable text and best plagiarism remover.",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
          },
        ],
      },
      alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL,
      },
    };
  }
}

const Article = async (props: any) => {
  return (
    <main className="flex w-full max-w-[1440px] self-center flex-wrap gap-2 px-3 bg-white mt-10">
      <section className="flex flex-col flex-1 basis-[100%] md:basis-[68%] overflow-auto ">
        <Suspense fallback={<ArticleSkeleton />}>
          {(async function () {
            return <ShowArticle slug={props?.params?.slug as any} />;
          })()}
        </Suspense>
      </section>

      <section className="flex flex-col flex-1 basis-[100%] md:basis-[22%] px-2 gap-4 ">
        <Suspense fallback={<DynamicNewsWallSkeleton label="Popular" />}>
          {(async function () {
            return <DynamicNewsWall title="Popular" start={0} end={6} />;
          })()}
        </Suspense>
        <AdCustom
          dataAdId={info.RESPONSIVE_ADS_4.id}
          width={info.RESPONSIVE_ADS_4.width}
          height={info.RESPONSIVE_ADS_4.height}
        />
        <Suspense fallback={<DynamicNewsWallSkeleton label="Recent" />}>
          {(async function () {
            return <DynamicNewsWall title="Recent" start={6} />;
          })()}
        </Suspense>
      </section>
    </main>
  );
};

export default Article;
