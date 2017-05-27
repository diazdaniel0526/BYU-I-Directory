import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 240 - Networking', 'This course teaches general networking principles to ' +
      'provide an understanding of data communication protocols, transmission systems, media, and software.',
      'http://www.byui.edu/computer-information-technology/courses', null),
    new Document('2', 'CIT 353 - Operating Systems II',
      'The purpose of this course is to provide students with the administration skills to plan, ' +
      'install/configure, and manage Windows 2008 servers in a corporate environment.',
      'http://www.byui.edu/computer-information-technology/courses',
      null),
    new Document('3', 'CIT 160 - CIT Fundamentals',
      'An introduction to the basic concepts of computers and information technology. Students will ' +
      'learn the basics of computer hardware and the binary and hexadecimal number systems. ',
      'http://www.byui.edu/computer-information-technology/courses',
      null),
    new Document('4', 'CIT 370 - Systems Security I',
      'The purpose of the course is to provide the student with an overview of the field of ' +
      'Information Security and Assurance.',
      'http://www.byui.edu/computer-information-technology/courses',
      null),
    new Document('5', 'CIT 336 - Web Backend Development',
      'This course prepares students to develop web sites by continuing the implementation of ' +
      'concepts from the Web Frontend development course and adding backend components ' +
      '(MySQL databases, PHP, SQL, and the MVC design pattern) to create dynamic web sites.',
      'http://www.byui.edu/computer-information-technology/courses',
      null),
    new Document('6', 'CIT 498 - Internship', 'This is designed to be a capstone experience ' +
      'where a student applies the skills they have learned in information system in a real world environment.',
      'http://www.byui.edu/computer-information-technology/courses', null),
    new Document('7', 'CIT 230 - Web Frontend Development', 'This course prepares students to develop web sites ' +
      'through a study of Hypertext Markup Language (HTML5), Cascading Style Sheets (CSS), Usability principles ' +
      'and User Interface (UI) principles.',
      'http://www.byui.edu/computer-information-technology/courses', null),
    new Document('8', 'CIT 111 - Introduction to Databases', 'This course covers the basic elements of database ' +
      'management systems.  It introduces students to the concepts of logical and physical relationships in ' +
      'a data model and the concepts of inner and outer joins.',
      'http://www.byui.edu/computer-information-technology/courses', null),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
