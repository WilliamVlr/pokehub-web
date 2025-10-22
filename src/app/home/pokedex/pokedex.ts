import { Component, DestroyRef, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonPage, PokemonService } from './pokedex.service';
import { Pokemon, PokemonListResponse } from '../pokemon';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokedex',
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css'
})
export class Pokedex implements OnInit {
  pokemons: Pokemon[] = [];
  isLoading = true;
  offset = 0;
  page = 1;
  pageSize = 20;
  lastIndex = this.offset;
  collectionSize = signal<number>(0);

  private pokemonService = inject(PokemonService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const savedPage = sessionStorage.getItem('pokedexPage');
    if (savedPage) {
      this.page = +savedPage;
    }
    const subs = this.loadPokemons();
    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    });
  }

  loadPokemons() {
    this.offset = (this.page - 1) * this.pageSize;
    this.isLoading = true;

    return this.pokemonService.getPokemonHeaders(this.pageSize, this.offset).subscribe({
      next: (res) => {
        this.collectionSize.set(res.count);
        this.fetchPokemonDetails(res);
        sessionStorage.setItem('pokedexPage', this.page.toString());
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    })
  }

  fetchPokemonDetails(res: PokemonListResponse) {
    return this.pokemonService.getPokemonData(res).subscribe({
      next: (r) => {
        this.pokemons = r.pokemons;
        this.lastIndex = this.offset + this.pokemons.length;
        this.offset++;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    })
  }

  
}
