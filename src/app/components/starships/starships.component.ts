import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  public starshipId!: number;
  public starships: Starship[] = [];
  public starshipsFiltered: Starship[] = [];
  starship = {} as Starship;

  public pagina = 1;

  public viewButton = true;
  public nameButton = '';

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
    private modalService: BsModalService,
    private toastr: ToastrService
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
        this.loading();

        this.toastr.success('Dados carregados', 'Sucesso!');
      },
      (error: any) => {

        if (this.starships.length === 0) {
          this.toastr.error('Sem Starships cadastradas.', 'Erro!');
        }
        if (this.starships.length != 0){
          this.toastr.error('Erro ao carregar dados', 'Erro!');
          console.error(error);
      }
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

  public loading(): void {
    if (this.viewButton) {
      var viewMore = this.starshipsFiltered.slice(0,6);
      this.starshipsFiltered = viewMore;
      this.nameButton = 'View More';
    }else {
      if (this.starships.length > 6) {
      this.starshipsFiltered = this.starships;
      this.nameButton = 'View Less';
    }else{
      this.toastr.error(`Existem somente: ${this.starshipsFiltered.length} starships registradas. `, `Erro!`);
    }
    }
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

  openModalAddStarship(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openModalDelete(event: any, template: TemplateRef<any>, starshipId: number): void {
    console.log(template);
    event.stopPropagation();
    this.starshipId = starshipId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmAddStarship(): void {
    this.modalRef.hide();
  }

  declineStarship(): void {
    this.modalRef.hide();
  }

  declineDeleteStarship(): void {
    this.modalRef.hide();
  }

  confirmDeleteStarship(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.starshipService.deleteStarshipById(this.starshipId).subscribe(
      () => {
        var nameStarship = '';
        this.starships.forEach(x => {
          nameStarship = x.name;
        });

          this.toastr.success(`O Starship ${nameStarship} foi deletada com sucesso`, 'Sucesso!');
          window.location.reload();
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar a Starship ${this.starshipId}`, 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());

  }

}
