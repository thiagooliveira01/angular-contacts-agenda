import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactService } from './services/contact-service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe'; 
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListContactsComponent,
    CreateContactComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
  exports:[
    FilterPipe
  ]
})
export class AppModule { }
