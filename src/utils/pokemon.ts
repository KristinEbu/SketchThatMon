export type Pokemon = { name: string; url: string };

export async function fetchRandomPokemon(): Promise<Pokemon> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data: { results: Pokemon[] } = await res.json();
  return data.results[Math.floor(Math.random() * data.results.length)];
}

export async function loadOrFetchPokemon(): Promise<Pokemon> {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("currPokemon") : null;

  if (stored) return JSON.parse(stored) as Pokemon;

  return overwriteStoredPokemon();
}

export async function overwriteStoredPokemon(): Promise<Pokemon> {
  const pokemon = await fetchRandomPokemon();
  if (typeof window !== "undefined") {
    localStorage.setItem("currPokemon", JSON.stringify(pokemon));
  }
  return pokemon;
}
