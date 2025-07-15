"use client";
import { GameProvider } from "@/context/gameContext";
import { PokemonProvider } from "@/context/pokemonContext";

export default function SoloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <PokemonProvider>{children}</PokemonProvider>
    </GameProvider>
  );
}
