"use client";
import "@/styles/globals.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Popup from "@/components/ui/popup";
import CanvasOptions from "@/components/game/canvasOptions";
import { useGameContext } from "@/context/gameContext";

export default function Game() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    isCanvasOn,
    isSkipsOn,
    isTimerOn,
    timerDuration,
    reset,
    currRound,
    setCurrRound,
    skipsLeft,
    setSkipsLeft,
  } = useGameContext();

  const [pokemon, setPokemon] = useState<{ name: string; url: string } | null>(
    null,
  );

  useEffect(() => {
    const saved = localStorage.getItem("currentPokemon");
    if (saved) setPokemon(JSON.parse(saved));
    else fetchAndSetRandomPokemon();

    return () => {
      localStorage.removeItem("currentPokemon");
      localStorage.removeItem("timerEnd");
    };
  }, []);

  async function fetchAndSetRandomPokemon() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await res.json();
    const random =
      data.results[Math.floor(Math.random() * data.results.length)];
    setPokemon(random);
    localStorage.setItem("currentPokemon", JSON.stringify(random));
  }

  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isTimerOn) {
      return undefined;
    }

    const storedEnd = localStorage.getItem("timerEnd");
    const endTime = storedEnd
      ? Number(storedEnd)
      : Date.now() + timerDuration * 60 * 1000;

    if (!storedEnd) localStorage.setItem("timerEnd", endTime.toString());

    function tick() {
      const remaining = Math.max(Math.floor((endTime - Date.now()) / 1000), 0);
      setTimeLeft(remaining);
      if (remaining === 0 && timerRef.current) {
        clearInterval(timerRef.current);
        router.push(`/solo/game/${currRound}/result`);
      }
    }

    tick();
    timerRef.current = setInterval(tick, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerOn, timerDuration, currRound, router]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0",
    )}`;

  return (
    <div className="flex flex-col flex-grow justify-between h-full w-full px-10">
      <Popup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        label="Are you sure you want to exit the game?"
        description="Progress will be lost (including all drawings)"
        buttonLabelLeft="Cancel"
        onClickLeft={() => setIsPopupOpen(false)}
        buttonLabelRight="OK"
        onClickRight={() => {
          reset();
          setCurrRound(0);
          localStorage.removeItem("currentPokemon");
          localStorage.removeItem("timerEnd");
          router.push("/solo/game-results");
        }}
      />
      {!isCanvasOn && <div />}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-6 items-center">
          <h1 className="font-title text-6xl">
            {pokemon ? pokemon.name.toUpperCase() : "LOADING..."}
          </h1>
          {isTimerOn && <p className="text-xl">{fmt(timeLeft)}</p>}
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
            onClick={() => {
              setSkipsLeft((prev: number) => prev - 1);
              fetchAndSetRandomPokemon();
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
            onClick={() => router.push(`/solo/game/${currRound}/results`)}
          >
            Reveal (End Round)
          </Button>
        </div>
      </div>
      <footer className="flex justify-between items-center p-4">
        <div className="font-title text-3xl">Round: {currRound}</div>
        <Button color="primary" onClick={() => setIsPopupOpen(true)}>
          End Game
        </Button>
      </footer>
    </div>
  );
}
