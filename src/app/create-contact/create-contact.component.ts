import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact-service';
import { ContactInfo } from '../classes/Contact';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  error: any;
  
  angForm: FormGroup;
  selectedFile: ImageSnippet;

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

  processFile(avatarURL: any) {
    const file: File = avatarURL.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

    });

    reader.readAsDataURL(file);

  }

  ngOnInit() {
  }

}
