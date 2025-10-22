import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NgbAccordionDirective, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokedex } from "./home/pokedex/pokedex";
import { MyPokemons } from './home/my-pokemons/my-pokemons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbModule, NgbAccordionDirective, Pokedex, MyPokemons],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pokehub-web');
  show = 'pokedex';

  ngOnInit(): void {
    const s = sessionStorage.getItem('show');
    if(s) this.show = s;
  }
  
  showPokedex() {
    this.show = 'pokedex';
    sessionStorage.setItem('show', this.show);
  }

  showMyPokemons() {
    this.show = 'mypokemons';
    sessionStorage.setItem('show', this.show);
  }

}
