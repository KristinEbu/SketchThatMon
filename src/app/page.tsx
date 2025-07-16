"use client";
import "@/styles/globals.css";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-8 pt-24">
      <h1 className="font-title text-8xl font-bold text-center">
        SketchThatMon
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <Button
            color="primary"
            size="large"
            onClick={() => router.push("/solo/game/settings")}
          >
            Solo
          </Button>
          <Button color="tertiary" disabled={true} className="mt-2 w-1/2">
            Poke Gallery
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <Button color="secondary" size="large" disabled={true}>
            Versus
          </Button>
        </div>
      </div>
    </div>
  );
}
