"use client";
import { GameProvider } from "@/context/gameContext";

export default function SoloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameProvider>{children}</GameProvider>;
}
