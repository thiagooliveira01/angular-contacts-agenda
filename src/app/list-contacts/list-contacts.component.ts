import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '../classes/Contact';
import { ContactService } from '../services/contact-service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {

  public listaContato : ContactInfo[];
  public searchString: string;
  error: any;
  
  constructor(private contactService: ContactService ) { }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe(
        data => (this.listaContato = data.sort((a,b)=>a.name.localeCompare(b.name))),
        error => (this.error = error)
      );
  }
  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(res => {
      console.log('Deletado');
      this.getContacts();
    });
  }

  ngOnInit() {
    this.getContacts();
    console.log(this.listaContato);
  }
}
