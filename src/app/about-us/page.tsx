import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AI textHumanize | We Help You Scale Content Production",
  description:
    "AI textHumanize is an AI writing tool that combines the ability of AI and man creativeness to help you commission up your capacity base ferment.",
  openGraph: {
    url: process.env.NEXT_PUBLIC_SITE_URL,
    type: "website",
    title: "About AI textHumanize | We Help You Scale Content Production",
    description:
      "AI textHumanize is an AI writing tool that combines the ability of AI and man creativeness to help you commission up your capacity base ferment.",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: "en" | "es" };
}) {
  return (
    <main className="flex w-full max-w-[1440px] self-center items-center flex-col flex-wrap h-auto gap-2  px-5 md:px-10">
      <h1 className="flex w-full flex-col text-xl lg:text-3xl font-semibold items-center px-8 py-4 md:py-6 lg:py-12 bg-gradient-to-br from-own_gradient_from_secondary to-own_gradient_to_secondary my-5 text-own_text_white_primary">
        About us
      </h1>
      <p className="self-start">
        Welcome to AI textHumanize.com – Where Artificial Intelligence Meets the
        Humanity{" "}
      </p>
      <p className="self-start">{`At AI textHumanize.com, we aim to bridgework the gap betwixt fashionable Artificial Intelligence and the art of human building and solve normal real life problems. We are an aflame inaugural that believes in the power of base and the magic of words. Our inaugural trip began with an idea; to humanize AI generated text and make it approachable to everyone,' everywhere as well as and that is too for free. `}</p>
      <h2 className="text-[18px] lg:text-xl font-semibold py-3 self-start">
        Our Vision
      </h2>
      <p className="ml-5">{`In a world flooded with AI generated content,' we envisioned a rising where engineering seamlessly blends with human creativity. We see a world where capacity creators, copywriters,' and marketers could effortlessly transmute AI generated text into high quality capacity that engages and resonates with their audiences, and is not robotic.`}</p>
      <h2 className="text-[18px] lg:text-xl font-semibold py-3 self-start">
        Our Innovative Solution
      </h2>
      <p className="ml-5">
        Our textHumanize is the free on line, AI text converter. With this
        groundbreaking tool as well as we have unlocked the effectiveness of AI
        generated text by giving it a human touch. It was not just a tool; it is
        your originative companion.
      </p>
    </main>
  );
}
