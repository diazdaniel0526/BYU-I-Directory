import {Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WindRefService} from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;

  constructor(private documentService: DocumentsService,
              private windRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id: string = params['id'];
          this.document = this.documentService.getDocument(id);
        }
      );
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
