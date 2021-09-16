import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit {

  public peopleId!: number;
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
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar os Pilots', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());

  }

}
