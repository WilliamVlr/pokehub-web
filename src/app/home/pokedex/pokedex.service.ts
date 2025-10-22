import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonListResponse } from '../pokemon';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

export interface PokemonPage {
  next: string | null;
  previous: string | null;
  pokemons: Pokemon[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private httpClient = inject(HttpClient);

  getPokemonHeaders(limit: number = 20, offset: number = 0): Observable<PokemonListResponse> {
    return this.httpClient
      .get<PokemonListResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonData(res: PokemonListResponse): Observable<PokemonPage> {
    const detailRequest = res.results.map((pokemon: any) =>
      this.httpClient.get<any>(pokemon.url).pipe(
        map((details) => ({
          id: details.id,
          name: details.name,
          image: details.sprites.other['official-artwork'].front_default,
          types: details.types.map((t: any) => t.type.name),
          hp: details.stats.find((s: any) => s.stat.name === 'hp')?.base_stat,
          attack: details.stats.find((s: any) => s.stat.name === 'attack')?.base_stat,
        }))
      )
    );
    return forkJoin(detailRequest).pipe(
      map((pokemons) => ({
        pokemons,
        next: res.next,
        previous: res.previous
      }))
    );
  }
}
