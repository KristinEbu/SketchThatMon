"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { useGameContext } from "@/context/gameContext";
import { usePokemonContext } from "@/context/pokemonContext";

export default function FinalResults() {
  const router = useRouter();

  const { storageReset } = useGameContext();

  const { pokemonList, pokemonReset } = usePokemonContext();

  return (
    <div className="flex flex-col flex-grow justify-between h-full w-full p-4">
      <div />
      <div className="flex flex-col px-20 gap-8">
        <h1 className="font-title text-8xl text-center">
          Thank you for playing!
        </h1>

        <p className="text-2xl text-center">
          List of Pokémon:{" "}
          {pokemonList.length ? pokemonList.join(", ") : "No Pokemon Found"}
        </p>

        <div className="flex flex-col justify-center gap-2">
          <p className="text-center">Save your drawings to the Poke Gallery</p>
          <div className="flex justify-center">
            <Button color="tertiary" size="small" disabled>
              Save Game to Poke Gallery
            </Button>
          </div>
        </div>
      </div>

      <footer className="flex gap-4 ml-auto">
        <Button
          color="secondary"
          onClick={() => (storageReset(), pokemonReset(), router.push("/"))}
        >
          Back to Home
        </Button>
        <Button
          color="primary"
          onClick={() => (
            storageReset(),
            pokemonReset(),
            router.push("/solo/game/1")
          )}
        >
          Play Again
        </Button>
      </footer>
    </div>
  );
}
