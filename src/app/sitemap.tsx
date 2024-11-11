import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const revalidate = 30;

type changeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const changeFrequency = "daily" as changeFrequency;

  const articleResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/common/article/${process.env.NEXT_PUBLIC_SITE_ID}/recent/2000`,
    {
      next: { revalidate: 200 },
    }
  );
  const data1 = await articleResponse.json();

  const article =
    data1?.articles?.reduce((cur: any[], item: any, index: number) => {
      cur.push({
        url: `${siteUrl}/blog/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: changeFrequency,
        priority: 0.8,
      });
      return cur;
    }, []) || [];

  const otherFixture =
    [
      "Speed Checker",
      "Schema Generate",
      "Keyword Generate",
      "MetaData Generate",
      "MetaTag Generate",
      "privacy-policy",
      "disclaimer",
      "blog",
    ].reduce((cur: any[], item: any, index: number) => {
      cur.push({
        url: `${siteUrl}/${item}`,
        lastModified: new Date(),
        changeFrequency: changeFrequency,
        priority: 0.8,
      });
      return cur;
    }, []) || [];

  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...article,
    ...otherFixture,
  ];
}
