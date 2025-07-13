"use client";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import { useGameContext } from "@/context/gameContext";
import { overwriteStoredPokemon } from "@/utils/pokemon";

export default function GameRoundResult() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  let pokemon = null;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("currentPokemon");
    if (stored) pokemon = JSON.parse(stored);
  }

  const { isCanvasOn, isRoundsOn, numRounds, reset, currRound, setCurrRound } =
    useGameContext();

  const isFinalRound = isRoundsOn && currRound === numRounds;

  function getImageUrl(apiUrl: string) {
    const match = apiUrl.match(/\/pokemon\/(\d+)\//);
    const id = match ? match[1] : "1";
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  function handleNextRound() {
    if (!isRoundsOn || currRound < numRounds) {
      setCurrRound((prev) => {
        const next = prev + 1;
        return next;
      });
      overwriteStoredPokemon();
      router.push(`/solo/game/${currRound + 1}`);
    } else {
      router.push("solo/game-results");
    }
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
          reset();
          setCurrRound(0);
          router.push("/solo/game-results");
        }}
      />
      {!isCanvasOn && <div />}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-6 items-center">
          <h1 className="font-title text-6xl">
            {hasMounted ? pokemon.name.toUpperCase() : "LOADING..."}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="shrink-0">
            {hasMounted && pokemon ? (
              <Image
                src={getImageUrl(pokemon.url)}
                alt={pokemon.name}
                width={300}
                height={300}
              />
            ) : (
              <p>Loading Pokémon...</p>
            )}
          </div>
          {isCanvasOn && <div className="w-90 h-100 bg-white" />}
        </div>
        <div className="flex gap-4">
          <Button color="tertiary" size="small" disabled={true}>
            Save to Gallery
          </Button>
          <Button color="secondary" size="small" onClick={handleNextRound}>
            {isFinalRound ? "End Game" : "Next Round"}
          </Button>
        </div>
      </div>
      <footer className="flex justify-between items-center p-4">
        <div className="font-title text-3xl">
          Round: {currRound} {isFinalRound && "(FINAL ROUND)"}
        </div>
        <Button
          color="primary"
          onClick={() => {
            if (isFinalRound) {
              handleNextRound();
            } else {
              setIsPopupOpen(true);
            }
          }}
        >
          End Game
        </Button>
      </footer>
    </div>
  );
}
