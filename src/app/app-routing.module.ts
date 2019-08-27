import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { CreateContactComponent } from './create-contact/create-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListContactsComponent },
  { path: 'create', component: CreateContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
