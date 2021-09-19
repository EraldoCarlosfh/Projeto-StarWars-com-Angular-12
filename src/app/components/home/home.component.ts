import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  showMenu(): boolean {
    return (
      this.router.url != '/starships' &&
      this.router.url != '/pilots' &&
      this.router.url != '/pilotsdetails'
    );
  }

}
