import { Component, OnInit } from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
      new Message('1', 'Grades', 'What is my Grade?', 'Dan'),
      new Message('2', 'Absences', 'How many are my Absences?', 'Bob'),
      new Message('3', 'Assistance', 'How is my Assistance to class?', 'Sue')
    ];
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
  this.messages.push(message);
  }

}
