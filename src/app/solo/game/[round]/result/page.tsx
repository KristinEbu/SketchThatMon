"use client";
import "@/styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import { useGameContext } from "@/context/gameContext";
import { usePokemonContext } from "@/context/pokemonContext";

export default function GameRoundResult() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { isCanvasOn, isRoundsOn, numRounds, currRound, setCurrRound } =
    useGameContext();

  const { currPokemon, fetchNewPokemon, addToPokemonList } =
    usePokemonContext();

  const isFinalRound = isRoundsOn && currRound == numRounds;

  const getSpriteUrl = (apiUrl: string) => {
    const match = apiUrl.match(/\/pokemon\/(\d+)\//);
    const id = match ? match[1] : "1";
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const handleNextRound = () => {
    if (!isRoundsOn || currRound < numRounds) {
      const nextRound = currRound + 1;
      setCurrRound(nextRound);
      fetchNewPokemon();
      addToPokemonList();
      router.push(`/solo/game/${nextRound}`);
    } else {
      router.push("/solo/game/final-results");
    }
  };
  if (!currPokemon) {
    return (
      <div className="flex flex-col flex-grow justify-center items-center h-full w-full">
        <p>Loading Pokémon…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow justify-between h-full w-full">
      <Popup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        label="Are you sure you want to end the game?"
        buttonLabelLeft="Cancel"
        onClickLeft={() => setIsPopupOpen(false)}
        buttonLabelRight="OK"
        onClickRight={() => {
          addToPokemonList();
          router.push("/solo/game/final-results");
        }}
      />
      {!isCanvasOn && <div />}
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-title text-6xl">
          {currPokemon.name.toUpperCase()}
        </h1>

        <div className="flex items-center">
          <Image
            src={getSpriteUrl(currPokemon.url)}
            alt={currPokemon.name}
            width={300}
            height={300}
            className="shrink-0"
          />

          {isCanvasOn && <div className="w-90 h-100 bg-white" />}
        </div>
        <div className="flex gap-4">
          <Button color="tertiary" size="small" disabled>
            Save to Gallery
          </Button>
          <Button color="secondary" size="small" onClick={handleNextRound}>
            {isFinalRound ? "End Game" : "Next Round"}
          </Button>
        </div>
      </div>
      <footer className="flex justify-between items-center p-4">
        <div className="font-title text-3xl">
          Round: {currRound} {isFinalRound && " (FINAL ROUND)"}
        </div>
        <Button
          color="primary"
          onClick={() =>
            isFinalRound ? handleNextRound() : setIsPopupOpen(true)
          }
        >
          End Game
        </Button>
      </footer>
    </div>
  );
}
