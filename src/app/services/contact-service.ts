import { Injectable } from '@angular/core';
import { ContactInfo } from '../classes/Contact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = 'http://localhost:5001/contacts';
  private token = localStorage.token = Math.random().toString(36).substr(-8);

  constructor(private http: HttpClient) {}
  
  //Pegando todos contatos.
  getContacts(){
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.token);

    return this.http
      .get<ContactInfo[]>(this.contactsUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  //Removendo
  deleteContact(contact : ContactInfo){
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.token);

    const url = `${this.contactsUrl}/${contact.id}`;

    return this.http.delete<ContactInfo>(url).pipe(catchError(this.handleError));
  }

  //Criando
  postContact(contact :ContactInfo){
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');

    return this.http
      .post<ContactInfo>(this.contactsUrl, contact)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
