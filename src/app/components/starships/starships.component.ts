import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StarshipsService } from 'src/app/services/starships.service';
import { Starship } from 'src/app/models/Starship';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {

  modalRef!: BsModalRef;
  public starships: Starship[] = [];
  public starshipsFiltered: Starship[] = [];
  starship = {} as Starship;

  public pagina = 1;

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
    //console.log('Inicial',this.pagina);
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
      (starships: any) => {
        this.starships = starships;
        this.starshipsFiltered = this.starships;
        this.toastr.success('Dados carregados', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar dados', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  mudarPagina(): void {
    this.pagina++;
    if (this.pagina > 4){
        this.pagina = 1;
    }
   // console.log('Mais',this.pagina);
  }

  mudarPagina2(): void {
    this.pagina--;
    //console.log('Menos',this.pagina);
  }

  public GetAllStarshipPage(): void {
    this.starshipService.getStarshipPage(this.pagina).subscribe(
      (starships: any) => {
        this.starships = starships;
        this.starshipsFiltered = this.starships;
        this.toastr.success('Dados carregados', 'Sucesso!');

      },
      (error: any) => {
        this.toastr.error('Erro ao carregar dados', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

}
