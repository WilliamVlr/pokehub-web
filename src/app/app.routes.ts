import { Routes } from '@angular/router';
import { Pokedex } from './home/pokedex/pokedex';

export const routes: Routes = [
    {
        path: '',
        title: 'Pokedex',
        component: Pokedex
    }
];
