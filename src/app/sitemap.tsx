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
  const lang = [
    "en",
    "es",
    "da",
    "de",
    "fr",
    "id",
    "it",
    "ja",
    "pt",
    "ru",
    "tr",
  ];

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
    ["about-us", "terms-conditions", "privacy-policy", "disclaimer", 'blog'].reduce(
      (cur: any[], item: any, index: number) => {
        cur.push({
          url: `${siteUrl}/${item}`,
          lastModified: new Date(),
          changeFrequency: changeFrequency,
          priority: 0.8,
        });
        return cur;
      },
      []
    ) || [];

  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/da`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/de`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/id`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/it`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ja`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ru`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tr`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...article,
    ...otherFixture
  ];
}
