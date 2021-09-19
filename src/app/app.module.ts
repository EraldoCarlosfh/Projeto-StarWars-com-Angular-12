import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { StarshipsService } from './services/starships.service';
import { FilmsService } from './services/films.service';
import { PeopleService } from './services/people.service';
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
    FormsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation: 'increasing',
      progressBar: true
    }),
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
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
