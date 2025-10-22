import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { MyPokemonsService } from './my-pokemons.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-my-pokemons',
  imports: [DecimalPipe],
  templateUrl: './my-pokemons.html',
  styleUrl: './my-pokemons.css'
})
export class MyPokemons implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading = true;

  private mypokemonService = inject(MyPokemonsService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subs = this.fetchMyPokemon();
    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    })
  }

  fetchMyPokemon(){
    return this.mypokemonService.getAll().subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.warn('Failed to fetch my pokemon data: ', err);
        this.isLoading = false;
      }
    })
  }
}
