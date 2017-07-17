import {EventEmitter, Injectable} from '@angular/core';
//import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';
import {Subject} from 'rxjs/Subject';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class DocumentsService {
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor(private http: Http) {
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
    this.initDocuments();
  }

  initDocuments(){
    return this.http.get('https://diazdanielcms.firebaseio.com/documents.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Document[]) => {
          this.documents = data;
          this.documentListChangedEvent.next(this.documents);
          this.maxDocumentId = this.getMaxId();
        }
      );
  }

  getDocuments() {
    return this.documents.slice();
  }

  storeDocuments() {
    const storedDocuments= JSON.stringify(this.documents);
    const header = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.put('https://diazdanielcms.firebaseio.com/documents.json'
      , storedDocuments
      , {headers: header})
      .subscribe(
        () => this.documentListChangedEvent.next(this.documents.slice())
      );
  }

  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.storeDocuments();
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone)
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
  }

}
