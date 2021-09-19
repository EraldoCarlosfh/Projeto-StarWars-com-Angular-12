import { Component, OnInit, TemplateRef } from '@angular/core';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit {

  modalRef!: BsModalRef;
  public peopleName!: String;
  public peopleMass!: String;
  public peoples: People[] = [];
  public peoplesFiltered: People[] = [];
  people = {} as People;

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
      (peoples: { name: string; mass: string }) =>
      peoples.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      peoples.mass.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public GetAllPeople(): void {
    this.peopleService.getPeople().subscribe(
      (peoples: People[]) => {
        this.peoples = peoples;
        this.peoplesFiltered = this.peoples;
        this.toastr.success('Dados carregados', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar dados', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  openModal(template: any, people: People): void {
    // peopleName: string, peopleMass: string
    console.log(people);
    // this.peopleName = peopleName;
    // this.peopleMass = peopleMass;
    this.modalRef = this.modalService.show(template, people);
  }

  confirmPeople(): void {
    this.modalRef.hide();
  }

  declinePeople(): void {
    this.modalRef.hide();
  }

}
