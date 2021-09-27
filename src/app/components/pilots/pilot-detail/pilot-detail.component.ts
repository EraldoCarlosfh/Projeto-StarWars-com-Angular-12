import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.scss'],
})
export class PilotDetailComponent implements OnInit {
  modalRef!: BsModalRef;
  pilotId!: number;
  pilot = {} as People;
  form!: FormGroup;
  stateSave = 'postPilot';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private peopleService: PeopleService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public carregarPilot(): void {
    this.pilotId = +this.activatedRouter.snapshot.paramMap.get('id')!;
    //this.pilotId = 1;
    if (this.pilotId !== null && this.pilotId !== 0) {
      this.spinner.show();

      this.stateSave = 'putPilot';

      this.peopleService
        .getPilotById(this.pilotId)
        .subscribe(
          (pilot: People) => {
            this.pilot = { ...pilot };
            this.form.patchValue(this.pilot);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Piloto.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarPilot();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      ],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.max(100)]],
      height: ['', [Validators.required, Validators.max(1000)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  savePilot(template: any): void {
    this.spinner.show();
    if (this.form.valid) {
      if(this.stateSave === 'postPilot') {
      this.pilot = { ...this.form.value };
      this.peopleService
        .postPilot(this.pilot)
        .subscribe(
          (pilotRetorno: People) => {
            // (pilotRetorno: People) => {
            this.toastr.success(`Pilot: ${this.pilot.name} salvo com sucesso.`, 'Sucesso!');
            this.router.navigate([`pilots/detail/${pilotRetorno.id}`]);
            // this.router.navigate([`pilots/detail/${pilotRetorno.id}`]);
            this.resetForm();
          },
          (error: any) => {
            this.toastr.error(`Pilot: ${this.pilot.name} não foi salvo`, 'Erro!');
            console.error(error);
          }
        ).add(() => this.spinner.hide());
      }else {
        this.pilot = { id: this.pilot.id, ...this.form.value };
        this.peopleService
          .putPilot(this.pilot)
          .subscribe(
            () =>
              this.toastr.success(`Piloto: ${this.pilot.name} atualizado com sucesso.`, 'Sucesso!'),
            (error: any) => {
              this.toastr.error(`Pilot: ${this.pilot.name} não foi salvo`, 'Erro!');
              console.error(error);
            }
          ).add(() => this.spinner.hide());
      }
      this.openModal(template);
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
