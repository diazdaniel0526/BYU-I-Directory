import {Component, OnDestroy, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentsService: DocumentsService) {
    this.documents = this.documentsService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentsService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
    // this.documentsService.getDocuments().subscribe(
    //   (document: Document[]) => this.documents = document);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
