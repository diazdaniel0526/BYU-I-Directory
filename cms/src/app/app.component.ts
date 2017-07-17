import { Component } from '@angular/core';
import {DocumentsService} from "./documents/documents.service";
import {ContactService} from "./contacts/contact.service";
import {MessagesService} from "./messages/messages.service";

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private documentService: DocumentsService,
              private contactsService: ContactService,
              private messagesService: MessagesService) {

  }
}
