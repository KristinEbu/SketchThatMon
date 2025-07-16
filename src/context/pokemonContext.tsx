"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { loadOrFetchPokemon, overwriteStoredPokemon } from "@/utils/pokemon";

export type Pokemon = { name: string; url: string };

type PokemonContextType = {
  currPokemon: Pokemon | null;
  fetchNewPokemon: () => Promise<void>;
  pokemonList: string[];
  addToPokemonList: (name?: string) => void;
  pokemonReset: () => void;
};

const PokemonContext = createContext<PokemonContextType | null>(null);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [currPokemon, setCurrPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  useEffect(() => {
    loadOrFetchPokemon().then(setCurrPokemon);
    if (typeof window !== "undefined") {
      setPokemonList(JSON.parse(localStorage.getItem("pokemonList") || "[]"));
    }
  }, []);

  useEffect(() => {
    if (currPokemon && typeof window !== "undefined") {
      localStorage.setItem("currPokemon", JSON.stringify(currPokemon));
    }
  }, [currPokemon]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
    }
  }, [pokemonList]);

  const fetchNewPokemon = useCallback(async () => {
    const fresh = await overwriteStoredPokemon();
    setCurrPokemon(fresh);
  }, []);

  const addToPokemonList = useCallback(
    (name?: string) => {
      const toAdd = (name ?? currPokemon?.name)?.toUpperCase();
      if (!toAdd) return;

      setPokemonList((prev) =>
        prev.includes(toAdd) ? prev : [...prev, toAdd],
      );
    },
    [currPokemon],
  );

  const pokemonReset = useCallback(() => {
    setCurrPokemon(null);
    setPokemonList([]);
    localStorage.removeItem("currPokemon");
    localStorage.removeItem("pokemonList");
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        currPokemon,
        fetchNewPokemon,
        pokemonList,
        addToPokemonList,
        pokemonReset,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemon must be inside <PokemonProvider>");
  return context;
}
