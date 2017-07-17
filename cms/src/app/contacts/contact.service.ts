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
    return this.http.get('https://diazdanielcms.firebaseio.com/contacts.json')
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

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact,
                 newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone)
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }
}
