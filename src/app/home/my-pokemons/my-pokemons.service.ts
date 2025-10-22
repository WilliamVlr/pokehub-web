import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MyPokemonResponse, Pokemon } from '../pokemon';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyPokemonsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/pokemons';

  getAll(): Observable<Pokemon[]> {
    return this.http.get<MyPokemonResponse[]>(this.baseUrl).pipe(
      map((res) =>
        res.map((r) => ({
          id: r.id,
          name: r.name,
          image: undefined,
          types: [r.type1, r.type2].filter((t): t is string => t != null && t !== ''),
          hp: r.hp,
          attack: r.attack,
        }))
      )
    );
  }
}
