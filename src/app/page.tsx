import Information from "@/components/information";
import SchemaGenerator from "@/components/schema-generator";

export default async function Home() {
  return (
    <main className="flex w-full flex-col flex-wrap gap-24 my-20">
      <Information />
      <SchemaGenerator />
    </main>
  );
}
