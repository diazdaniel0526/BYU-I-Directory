import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from '../message.model';
import {MessagesService} from '../messages.service';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: 'Daniel';
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subj = this.subjectRef.nativeElement.value;
    const msg = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('id', subj, msg, "1");
    this.addMessageEvent.emit(newMessage);
    this.messagesService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
