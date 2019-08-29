import { Injectable } from '@angular/core';
import { ContactInfo, RootObject } from '../classes/Contact';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  getContacts() : Observable<ContactInfo[]>{
    const Hheaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .append('Authorization', '1');

    return this.http
      .get<RootObject>(this.contactsUrl, { headers: Hheaders })
      .pipe(map(data => data.contacts ), catchError(this.handleError));
  }

  //Removendo
  deleteContact(contact : ContactInfo){
    let headers = new Headers();
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
