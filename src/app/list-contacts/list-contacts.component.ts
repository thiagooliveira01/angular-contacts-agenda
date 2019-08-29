import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '../classes/Contact';
import { ContactService } from '../services/contact-service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {

  public listaContato : ContactInfo[] = [];
  error: any;
  
  constructor(private contactService: ContactService ) { }

  ngOnInit() {
    this.getContacts();

    console.log(this.listaContato);
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe(
        data => (this.listaContato = data),
        error => (this.error = error)
      )
    
  }
}
