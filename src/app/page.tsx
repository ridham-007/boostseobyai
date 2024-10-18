import ArticleSchema from "@/components/article-schema";
import EventSchema from "@/components/event-schema";
import Information from "@/components/information";
import SelectionType from "@/components/SelectionType";

export default async function Home() {
  return (
    <main className="flex w-full flex-col flex-wrap gap-24 my-20">
      <Information />
      <SelectionType />
    </main>
  );
}
