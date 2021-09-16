import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { StarshipsService } from './services/starships.service'
import { FilmsService } from './services/films.service'
import { PeopleService } from './services/people.service'
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
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule
  ],
  providers: [
    StarshipsService,
    FilmsService,
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
