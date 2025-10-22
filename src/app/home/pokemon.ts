export interface Pokemon {
    id: number;
    name: string;
    image?: string;
    types: string[];
    hp: number;
    attack: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface MyPokemonResponse {
  id: number;
  name: string;
  type1: string;
  type2: string | null;
  hp: number;
  attack: number;
}