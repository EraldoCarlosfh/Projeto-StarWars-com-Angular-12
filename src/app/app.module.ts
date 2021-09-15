import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { PilotsComponent } from './components/pilots/pilots.component';

@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      FooterComponent,
      HomeComponent,
      StarshipsComponent,
      PilotsComponent
   ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
