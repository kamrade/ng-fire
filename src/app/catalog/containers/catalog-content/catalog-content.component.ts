import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-catalog-content',
  templateUrl: './catalog-content.component.html',
  styleUrls: ['./catalog-content.component.scss']
})
export class CatalogContentComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  currentRoute: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit() {

    this.route.url
      .pipe(
        takeUntil(this.destroy$),
        tap(route => (this.currentRoute = route[0].path))
      )
      .subscribe();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
