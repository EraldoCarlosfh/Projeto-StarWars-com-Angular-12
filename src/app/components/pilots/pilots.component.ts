import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit {

  modalRef!: BsModalRef;
  public peopleName!: String;
  public peopleage!: String;
  public peopleFilms: People[] = [];
  public peoples: People[] = [];
  public peoplesFiltered: People[] = [];
  people = {} as People;

  public pagina = 1;

  public initial = 6;
  public viewButton = true;
  nameButton = 'ver mais';

  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.peoplesFiltered = this.filtroLista
      ? this.filterPeoples(this.filtroLista)
      : this.peoples;
  }

  constructor(
     private peopleService: PeopleService,
     private toastr: ToastrService,
     private modalService: BsModalService,
     private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
     this.spinner.show();
     this.GetAllPeople();
  }

  public filterPeoples(filtrarPor: string): People[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.peoples.filter(
      (peoples: { name: string; age: string }) =>
      peoples.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      peoples.age.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public loading(): void {
    // if (this.viewButton) {
    //   this.peoplesFiltered.length = this.initial;
    //   this.nameButton = 'Ver mais';
    // }else {
    //   this.peoplesFiltered =  this.peoplesFiltered;
    //   this.nameButton = 'Ver menos';
    // }
    this.GetAllPeople();
  }


  // public loading():void {
  //   if (this.viewButton) {
  //     this.peoplesFiltered.length = this.initial;
  //     this.nameButton = 'Ver mais';
  //   }else {
  //     this.peoplesFiltered.length = 10;
  //     this.nameButton = 'Ver menos';
  //   }
  // }

  public GetAllPeople(): void {
    this.peopleService.getPeople().subscribe(
      (peoples: any) => {
        this.peoples = peoples;
        this.peoplesFiltered = this.peoples;

        if (this.viewButton) {
          this.peoplesFiltered.length = this.initial;
          this.nameButton = 'Ver mais';
        }else {
          this.peoplesFiltered =  this.peoplesFiltered;
          this.nameButton = 'Ver menos';
        }
        this.toastr.success('Dados carregados', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar dados', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  openModal(people: People): void {
    let initialState = {
      people
    }
    this.modalRef = this.modalService.show(ModalComponent, {class: 'modal-sm', initialState} );
  }

  confirmPeople(): void {
    this.modalRef.hide();
  }

  declinePeople(): void {
    this.modalRef.hide();
  }

  mudarPagina(): void {
    this.pagina++;
    if (this.pagina > 9){
        this.pagina = 1;
    }
   // console.log('Mais',this.pagina);
  }

  mudarPagina2(): void {
    this.pagina--;
    //console.log('Menos',this.pagina);
  }

  public GetAllPeoplePage(): void {
    this.peopleService.getPeoplePage(this.pagina).subscribe(
      (peoples: any) => {
        this.peoples = peoples;
        this.peoplesFiltered = this.peoples;

        if (this.viewButton) {
          this.peoplesFiltered.length = this.initial;
          this.nameButton = 'Ver mais';
        }else {
          this.peoplesFiltered =  this.peoplesFiltered;
          this.nameButton = 'Ver menos';
        }
        this.toastr.success('Dados carregados', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar dados', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

}
