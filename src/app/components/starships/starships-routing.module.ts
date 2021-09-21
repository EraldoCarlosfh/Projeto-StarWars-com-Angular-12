import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { StarshipsComponent } from './starships.component';

const starshipsRoutes: Routes = [
  { path: '', component: StarshipsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(starshipsRoutes)],
  exports: [RouterModule]
})

export class StarshipsRoutingModule {}
