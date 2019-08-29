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
  deleteContact(id : string){
    const Hheaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .append('Authorization', '1');

    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete(url, { headers: Hheaders }).pipe(catchError(this.handleError));
  }

  //Criando
  postContact(contact :ContactInfo){
    const Hheaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .append('Authorization', '1')
    .append('Content-Type', 'application/json');

    return this.http
      .post<ContactInfo>(this.contactsUrl, contact, { headers: Hheaders })
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
