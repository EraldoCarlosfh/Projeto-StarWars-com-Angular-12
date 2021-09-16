import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StarshipsService } from 'src/app/services/starships.service';
import { Starship } from 'src/app/models/Starship';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {

  public peopleId!: number;
  public starships: Starship[] = [];
  public starshipsFiltered: Starship[] = [];
  starship = {} as Starship;

  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.starshipsFiltered = this.filtroLista
      ? this.filterStarships(this.filtroLista)
      : this.starships;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private starshipService: StarshipsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
     this.GetAllStarship();
  }

  public filterStarships(filtrarPor: string): Starship[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.starships.filter(
      (starships: { name: string}) =>
      starships.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public GetAllStarship(): void {
    this.starshipService.getStarship().subscribe(
      (peoples: Starship[]) => {
        this.starships = peoples;
        this.starshipsFiltered = this.starships;
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar as Starships', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());

  }

}
