"use client";
import "@/styles/globals.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import CanvasOptions from "@/components/game/canvasOptions";
import { useGameContext } from "@/context/gameContext";
import { usePokemonContext } from "@/context/pokemonContext";

export default function Game() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    isCanvasOn,
    isRoundsOn,
    numRounds,
    isSkipsOn,
    isTimerOn,
    timerDuration,
    currRound,
    skipsLeft,
    setSkipsLeft,
  } = useGameContext();

  const { currPokemon, fetchNewPokemon } = usePokemonContext();

  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isTimerOn) {
      return undefined;
    }

    const storedEnd = localStorage.getItem("timerEnd");
    console.log(storedEnd);
    const endTime = storedEnd
      ? Number(storedEnd)
      : Date.now() + timerDuration * 60 * 1000;

    if (!storedEnd) localStorage.setItem("timerEnd", endTime.toString());

    function tick() {
      const remaining = Math.max(Math.floor((endTime - Date.now()) / 1000), 0);
      setTimeLeft(remaining);
      if (remaining === 0 && timerRef.current) {
        clearInterval(timerRef.current);
        localStorage.removeItem("timerEnd");
        router.push(`/solo/game/${currRound}/result`);
      }
    }

    tick();
    timerRef.current = setInterval(tick, 1000);

    return () => {
      localStorage.removeItem("timerEnd");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerOn, timerDuration, currRound, router]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0",
    )}`;

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
          router.push("/solo/game/final-results");
        }}
      />
      {!isCanvasOn && <div />}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-6 items-center">
          <h1 className="font-title text-6xl">
            {currPokemon ? currPokemon.name.toUpperCase() : "LOADING..."}
          </h1>
          {isTimerOn && <p className="text-xl">{formatTime(timeLeft)}</p>}
        </div>

        {isCanvasOn && (
          <div className="flex justify-center w-full">
            <div className="relative w-90 h-100 bg-white">
              <CanvasOptions className="absolute -left-15 top-10" />
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <Button
            color="secondary"
            size="small"
            onClick={async () => {
              if (isSkipsOn) {
                setSkipsLeft((prev) => prev - 1);
              }
              await fetchNewPokemon();
            }}
            disabled={skipsLeft === 0}
          >
            {isSkipsOn
              ? hasMounted
                ? `Skip (Left: ${skipsLeft})`
                : "LOADING..."
              : "Skip"}
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={() => (
              localStorage.removeItem("timerEnd"),
              router.push(`/solo/game/${currRound}/result`)
            )}
          >
            Reveal (End Round)
          </Button>
        </div>
      </div>
      <footer className="flex justify-between items-center p-6">
        <div className="font-title text-3xl">
          Round: {hasMounted ? currRound : "LOADING..."}
          {isRoundsOn && currRound == numRounds && " (FINAL ROUND)"}
        </div>
        <Button color="primary" onClick={() => setIsPopupOpen(true)}>
          End Game
        </Button>
      </footer>
    </div>
  );
}
