import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarshipsService } from 'src/app/services/starships.service';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';

@NgModule({
  declarations: [StarshipsComponent, StarshipDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarshipsRoutingModule,
    TooltipModule.forRoot()
  ],
  providers: [StarshipsService],
})
export class StarshipsModule { }
