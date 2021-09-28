import { Component, OnInit, TemplateRef } from '@angular/core';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';
import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { ModalEditComponent } from 'src/app/shared/modal-edit/modal-edit.component';
@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit {

  modalRef!: BsModalRef;
  public peopleId!: number;
  public peopleName!: String;
  public peopleage!: String;
  public peopleFilms: People[] = [];
  public peoples: People[] = [];
  public peoplesFiltered: People[] = [];
  people = {} as People;

  public pagina = 1;

  public viewButton = true;
  public nameButton = '';

  private listedFilter = '';

  public get filterList(): string {
    return this.listedFilter;
  }

  public set filterList(value: string) {
    this.listedFilter = value;
    this.peoplesFiltered = this.filterList
      ? this.filterPilots(this.filterList)
      : this.peoples;
  }

  constructor(
     private peopleService: PeopleService,
     private toastr: ToastrService,
     private modalService: BsModalService,
     private spinner: NgxSpinnerService,
     private router: Router
  ) { }

  ngOnInit(): void {
     this.spinner.show();
     this.GetAllPilot();
  }

  public filterPilots(filterBy: string): People[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.peoples.filter(
      (peoples: { name: string }) =>
      peoples.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );

  }

  public loading(): void {
    if (this.viewButton) {
      var viewMore = this.peoplesFiltered.slice(0,6);
      this.peoplesFiltered = viewMore;
      this.nameButton = 'View More';
    }else {
      if (this.peoples.length > 6) {
      this.peoplesFiltered = this.peoples;
      this.nameButton = 'View Less';
    }else{
      this.toastr.error(`Existem somente: ${this.peoplesFiltered.length} pilots registrados. `, `Erro!`);
    }
    }
  }

  public GetAllPilot(): void {
    this.peopleService.getAllPilot().subscribe(
      (peoples: any) => {
        this.peoples = peoples;
        this.peoplesFiltered = this.peoples;
        this.loading();
        if (this.peoples.length === 0) {
          this.toastr.error('Sem Pilotos cadastrados.', 'Erro!');
        }else{
        this.toastr.success('Dados carregados', 'Sucesso!');
      }
      },
      (error: any) => {
        if (this.peoples.length === 0) {
          this.toastr.error('Sem Pilotos cadastrados.', 'Erro!');
        }
        if (this.peoples.length != 0){
         this.toastr.error('Erro ao carregar dados', 'Erro!');
         console.error(error);
      }
      }
    ).add(() => this.spinner.hide());
  }

  openModal(people: People): void {
    let initialState = {
      people
    }
    this.modalRef = this.modalService.show(ModalComponent, {class: 'modal-sm', initialState} );
  }

  openModalAddPilot(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openModalDelete(event: any, template: TemplateRef<any>, peopleName: string, peopleId: number): void {
    console.log(template);
    event.stopPropagation();
    this.peopleName = peopleName;
    this.peopleId = peopleId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openModalEdit(event: any, template: TemplateRef<any>, peopleId: number): void {
    console.log(template);
    event.stopPropagation();
    this.peopleId = peopleId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmAddPilot(): void {
    this.modalRef.hide();
  }

  declinePilot(): void {
    this.modalRef.hide();
  }

  detalheEditPilot(): void {
    var peopleId: number;
    peopleId = this.peopleId;
      let initialState = {
        peopleId
      }
      this.modalRef = this.modalService.show(ModalEditComponent, {class: 'modal-dialog-centered', initialState});
    }

  confirmEditPilot(): void {
    this.modalRef.hide();
    this.toastr.success('Você será redirecionado.', 'Aguarde!');
  }

  declineEditPilot(): void {
    this.modalRef.hide();
  }

  declineDeletePilot(): void {
    this.modalRef.hide();
  }

  confirmDeletePilot(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.peopleService.deletePilotById(this.peopleId).subscribe(
      () => {
        var namePilot = '';
        this.peoples.forEach(x => {
          namePilot = x.name;
        });

          this.toastr.success(`O Piloto ${namePilot} foi deletado com sucesso`, 'Sucesso!');
          window.location.reload();
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o Piloto ${this.peopleName}`, 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());

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

  public GetAllPilotPage(): void {
    this.peopleService.getPilotPage(this.pagina).subscribe(
      (peoples: any) => {
        this.peoples = peoples;
        this.peoplesFiltered = this.peoples;

        if (this.viewButton) {
          var verMais = this.peoplesFiltered.slice(0,6);
          this.peoplesFiltered = verMais;
          this.nameButton = 'Ver mais';
        }else {
          this.peoplesFiltered =  this.peoples;
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
