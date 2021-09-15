import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PilotsComponent } from './pilots/pilots.component';
import { StarshipsComponent } from './starships/starships.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'pilots', component: PilotsComponent},
  { path: 'starships', component: StarshipsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
