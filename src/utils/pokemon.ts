export type Pokemon = { name: string; url: string };

/** Fetch one random Pokémon from the public PokéAPI */
export async function fetchRandomPokemon(): Promise<Pokemon> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data: { results: Pokemon[] } = await res.json();
  return data.results[Math.floor(Math.random() * data.results.length)];
}

/**
 * Return the Pokémon saved in localStorage (if present) or
 * fetch a new random one and persist it under "currentPokemon".
 */
export async function loadOrFetchPokemon(): Promise<Pokemon> {
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("currentPokemon")
      : null;

  if (stored) return JSON.parse(stored) as Pokemon;

  return overwriteStoredPokemon(); // fall through to fresh fetch / save
}

/** Always fetch a fresh Pokémon and overwrite "currentPokemon" in localStorage */
export async function overwriteStoredPokemon(): Promise<Pokemon> {
  const pokemon = await fetchRandomPokemon();
  if (typeof window !== "undefined") {
    localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
  }
  return pokemon;
}
