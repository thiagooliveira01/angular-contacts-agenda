import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact-service';
import { ContactInfo } from '../classes/Contact';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  error: any;
  
  constructor( private contactService: ContactService) { }

  ngOnInit() {
  }

  addContact(){
    let contact = new ContactInfo;
    this.contactService.postContact(contact).subscribe(res =>{}, error => (this.error = error));
  }

}
