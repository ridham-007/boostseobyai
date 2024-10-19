"use client";
import CustomButton from "@/components/ui/custom-button";
import '@/styles/globals.css'
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="flex w-full items-center h-full p-16">
      <div className="flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="flex flex-col items-center max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className="mt-4 mb-8">
            But don&apos;t worry, you can find plenty of other things on our homepage.
          </p>
          <CustomButton
            type="button"
            onClick={() => router.replace("/")}
            label={"Back to home"}
            className="mt-[52px] py-2 text-lg w-[250px] h-[50px] bg-black"
          ></CustomButton>
        </div>
      </div>
    </section>
  );
}
