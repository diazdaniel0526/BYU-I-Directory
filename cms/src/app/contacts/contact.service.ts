import { EventEmitter, Injectable } from '@angular/core';
import {Contact} from './contact.model';
//import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Http, Response, Headers} from '@angular/http';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ContactService {
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  constructor(private http: Http) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
    this.initContacts();
  }

  initContacts(){
    return this.http.get('localhost:3000/contacts')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data;
          this.contactListChangedEvent.next(this.contacts);
          this.maxContactId = this.getMaxId();
        }
      );
  }

  storeContacts() {
    const storedContacts= JSON.stringify(this.contacts);
    const header = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.put('https://diazdanielcms.firebaseio.com/contacts.json'
      , storedContacts
      , {headers: header})
      .subscribe(
        () => this.contactListChangedEvent.next(this.contacts.slice())
      );
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    this.http.post('localhost:3000/contacts', strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  updateContact(originalContact: Contact,
                 newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new Headers({
      "Content-Type": "application/json"
    });

    const strContact = JSON.stringify(newContact);

    this.http.patch('localhost:3000/contacts/' + originalContact.id, strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    this.http.delete('localhost:3000/contacts/' + contact.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }
}
