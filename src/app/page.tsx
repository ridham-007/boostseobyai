import Information from "@/components/information";
import SelectionType from "@/components/SelectionType";
import Tools from "@/components/tools";

export default async function Home() {
  return (
    <main className="flex w-full flex-col flex-wrap gap-24 my-20">
      <Information />
      <SelectionType />
      <Tools />
    </main>
  );
}
