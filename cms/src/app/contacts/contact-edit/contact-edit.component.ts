import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean;

  originalContact: Contact;

  constructor(private contactService: ContactService,
              private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id: string = params['id'];
          if (id === null) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(id);
          if (this.originalContact === null) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (!this.hasGroup) {
            this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    let newContact = null;

    if (this.editMode) {
      newContact = new Contact(this.originalContact.id, values.name, values.email, values.phone, values.imageUrl, []);
      this.contactService.updateContact(this.originalContact, newContact)
    }

    else {
      newContact = new Contact('', values.name, values.email, values.phone, values.imageUrl, []);
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    //if contact is outside the bounds of the array
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
