"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { Dispatch, SetStateAction } from "react";
import { DEFAULT_SETTINGS } from "@/data/settingsDefault";

type GameContextType = {
  isCanvasOn: boolean;
  setIsCanvasOn: (val: boolean) => void;
  isRoundsOn: boolean;
  setIsRoundsOn: (val: boolean) => void;
  numRounds: number;
  setNumRounds: (val: number) => void;
  isSkipsOn: boolean;
  setIsSkipsOn: (val: boolean) => void;
  numSkips: number;
  setNumSkips: (val: number) => void;
  isTimerOn: boolean;
  setIsTimerOn: (val: boolean) => void;
  timerDuration: number;
  setTimerDuration: (val: number) => void;
  regionValue: string[];
  setRegionValue: (val: string[]) => void;
  typeValue: string[];
  setTypevalue: (val: string[]) => void;
  legendaryValue: string[];
  setLegendaryValue: (val: string[]) => void;
  stageValue: string[];
  setStageValue: (val: string[]) => void;
  evolveValue: string[];
  setEvolveValue: (val: string[]) => void;
  formValue: string[];
  setFormValue: (val: string[]) => void;
  reset: () => void;
  currRound: number;
  setCurrRound: Dispatch<SetStateAction<number>>;
  skipsLeft: number;
  setSkipsLeft: Dispatch<SetStateAction<number>>;
  storageReset: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [isCanvasOn, setIsCanvasOn] = useState(DEFAULT_SETTINGS.isCanvasOn);
  const [isRoundsOn, setIsRoundsOn] = useState(DEFAULT_SETTINGS.isRoundsOn);
  const [numRounds, setNumRounds] = useState(DEFAULT_SETTINGS.numRounds);
  const [isSkipsOn, setIsSkipsOn] = useState(DEFAULT_SETTINGS.isSkipsOn);
  const [numSkips, setNumSkips] = useState(DEFAULT_SETTINGS.numSkips);
  const [isTimerOn, setIsTimerOn] = useState(DEFAULT_SETTINGS.isTimerOn);
  const [timerDuration, setTimerDuration] = useState(
    DEFAULT_SETTINGS.timerDuration,
  );

  const [regionValue, setRegionValue] = useState(DEFAULT_SETTINGS.regionValue);
  const [typeValue, setTypevalue] = useState(DEFAULT_SETTINGS.typeValue);
  const [legendaryValue, setLegendaryValue] = useState(
    DEFAULT_SETTINGS.legendaryValue,
  );
  const [stageValue, setStageValue] = useState(DEFAULT_SETTINGS.stageValue);
  const [evolveValue, setEvolveValue] = useState(DEFAULT_SETTINGS.evolveValue);
  const [formValue, setFormValue] = useState(DEFAULT_SETTINGS.formValue);

  const [currRound, setCurrRound] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    const saved = localStorage.getItem("currRound");
    return saved ? JSON.parse(saved) : 1;
  });

  const [skipsLeft, setSkipsLeft] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS.numSkips;
    const saved = localStorage.getItem("skipsLeft");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS.numSkips;
  });

  const reset = useCallback(() => {
    setIsCanvasOn(DEFAULT_SETTINGS.isCanvasOn);
    setIsRoundsOn(DEFAULT_SETTINGS.isRoundsOn);
    setNumRounds(DEFAULT_SETTINGS.numRounds);
    setIsSkipsOn(DEFAULT_SETTINGS.isSkipsOn);
    setNumSkips(DEFAULT_SETTINGS.numSkips);
    setIsTimerOn(DEFAULT_SETTINGS.isTimerOn);
    setTimerDuration(DEFAULT_SETTINGS.timerDuration);
    setRegionValue(DEFAULT_SETTINGS.regionValue);
    setTypevalue(DEFAULT_SETTINGS.typeValue);
    setLegendaryValue(DEFAULT_SETTINGS.legendaryValue);
    setStageValue(DEFAULT_SETTINGS.stageValue);
    setEvolveValue(DEFAULT_SETTINGS.evolveValue);
    setFormValue(DEFAULT_SETTINGS.formValue);
  }, [
    setIsCanvasOn,
    setIsRoundsOn,
    setNumRounds,
    setIsSkipsOn,
    setNumSkips,
    setIsTimerOn,
    setTimerDuration,
    setRegionValue,
    setTypevalue,
    setLegendaryValue,
    setStageValue,
    setEvolveValue,
    setFormValue,
  ]);

  const storageReset = useCallback(() => {
    localStorage.removeItem("currRound");
    localStorage.removeItem("currPokemon");
    localStorage.removeItem("skipsLeft");
    localStorage.removeItem("timerEnd");
    localStorage.removeItem("pokemonList");
    setCurrRound(1);
    setSkipsLeft(numSkips);
  }, [numSkips]);

  useEffect(() => {
    localStorage.setItem("skipsLeft", JSON.stringify(skipsLeft));
  }, [skipsLeft]);

  useEffect(() => {
    localStorage.setItem("currRound", JSON.stringify(currRound));
  }, [currRound]);

  return (
    <GameContext.Provider
      value={{
        isCanvasOn,
        setIsCanvasOn,
        isRoundsOn,
        setIsRoundsOn,
        numRounds,
        setNumRounds,
        isSkipsOn,
        setIsSkipsOn,
        numSkips,
        setNumSkips,
        isTimerOn,
        setIsTimerOn,
        timerDuration,
        setTimerDuration,
        regionValue,
        setRegionValue,
        typeValue,
        setTypevalue,
        legendaryValue,
        setLegendaryValue,
        stageValue,
        setStageValue,
        evolveValue,
        setEvolveValue,
        formValue,
        setFormValue,
        reset,
        currRound,
        setCurrRound,
        skipsLeft,
        setSkipsLeft,
        storageReset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
