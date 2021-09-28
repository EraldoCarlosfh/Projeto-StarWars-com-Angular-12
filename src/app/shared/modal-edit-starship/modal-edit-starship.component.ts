import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Starship } from 'src/app/models/Starship';
import { StarshipsService } from 'src/app/services/starships.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-edit-starship',
  templateUrl: './modal-edit-starship.component.html',
  styleUrls: ['./modal-edit-starship.component.scss']
})
export class ModalEditStarshipComponent implements OnInit {

  modalRef!: BsModalRef;
  starshipId!: number;
  starship = {} as Starship;
  form!: FormGroup;

   get f(): any {
    return this.form.controls;
  }


  constructor(
    private fb: FormBuilder,
    private starshipService: StarshipsService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  public carregarStarship(): void {
    if (this.starshipId !== null && this.starshipId !== 0) {
      this.spinner.show();

      this.starshipService
        .getStarshipById(this.starshipId)
        .subscribe(
          (starship: Starship) => {
            this.starship = { ...starship };
            this.form.patchValue(this.starship);
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
    this.carregarStarship();
    this.validation();
  }


  public validation(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['',
          [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      ],
      size: ['', [Validators.required, Validators.max(400)]],
      passengers: ['', [Validators.required, Validators.max(2000)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(): void {
    window.location.reload();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  saveStarship(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.starship = { ...this.form.value };
      this.starshipService
        .putStarship(this.starship)
        .subscribe(
          () =>
            this.toastr.success(`Starship: ${this.starship.name} atualizado com sucesso.`, 'Sucesso!'),
          (error: any) => {
            this.toastr.error(`Starship: ${this.starship.name} não foi salvo`, 'Erro!');
            console.error(error);
          }
        ).add(() => this.spinner.hide());
          window.location.reload();
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
