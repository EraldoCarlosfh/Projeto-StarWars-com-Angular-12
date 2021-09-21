import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PilotsComponent } from './pilots.component';

const pilotsRoutes: Routes = [
  { path: '', component: PilotsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(pilotsRoutes)],
  exports: [RouterModule]
})

export class PilotsRoutingModule {}
