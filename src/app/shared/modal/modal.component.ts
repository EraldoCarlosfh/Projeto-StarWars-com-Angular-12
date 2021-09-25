import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  people: any
  filmesFiltered: any;


  constructor() { }

  ngOnInit() {
    this.filtroUrl();
   }

   filtroUrl(): string {
    this.filmesFiltered = this.people.films.name;
    return this.filmesFiltered;
   }

}
