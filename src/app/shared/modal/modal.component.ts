import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  people: any

  constructor() { }

  ngOnInit() {
    this.filtroUrl();
   }

   filtroUrl(): string {
    return this.people;
   }

}
