import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotsRoutingModule } from './pilots-routing.module';
import { PilotsComponent } from './pilots.component';
import { FormsModule } from '@angular/forms';
import { PeopleService } from 'src/app/services/people.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@NgModule({
  declarations: [PilotsComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    PilotsRoutingModule,
  ],
  providers: [PeopleService],
})
export class PilotsModule { }
