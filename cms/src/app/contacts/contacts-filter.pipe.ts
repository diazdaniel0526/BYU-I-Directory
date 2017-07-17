import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];
    if (!term) {
      term = '';
    }

    filteredArray = contacts.filter(
      (contact: Contact) => {
        let tmpName: string = contact.name;
        tmpName = tmpName.toLowerCase();
        term = term.toLowerCase();
        return tmpName.includes(term)
      });

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }
}
