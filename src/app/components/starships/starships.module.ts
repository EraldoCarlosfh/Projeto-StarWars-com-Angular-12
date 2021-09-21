import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { FormsModule } from '@angular/forms';
import { StarshipsService } from 'src/app/services/starships.service';

@NgModule({
  declarations: [StarshipsComponent],
  imports: [
    CommonModule,
    FormsModule,
    StarshipsRoutingModule,
  ],
  providers: [StarshipsService],
})
export class StarshipsModule { }
