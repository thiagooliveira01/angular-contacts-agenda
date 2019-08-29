import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact-service';
import { ContactInfo } from '../classes/Contact';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  error: any;
  
  angForm: FormGroup;

  constructor( private contactService: ContactService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm(){
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      avatarURL: ['']
    });
  }
  addContact(name, email, avatarURL){
    let contact = new ContactInfo;
    contact.name = name;
    contact.email = email;
    contact.avatarURL = avatarURL;

    this.contactService.postContact(contact).subscribe(res =>{}, error => (this.error = error));

    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
