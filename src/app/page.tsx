import HomeInfo from "@/components/home-info";
import Tools from "@/components/tools";

export default async function Home() {
  return (
    <main className="flex w-full flex-col flex-wrap gap-28 my-20">
      <HomeInfo />
      <Tools />
    </main>
  );
}
