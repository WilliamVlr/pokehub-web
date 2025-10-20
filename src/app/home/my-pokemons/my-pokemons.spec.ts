import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPokemons } from './my-pokemons';

describe('MyPokemons', () => {
  let component: MyPokemons;
  let fixture: ComponentFixture<MyPokemons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPokemons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPokemons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
