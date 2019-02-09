import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-catalog-content',
  templateUrl: './catalog-content.component.html',
  styleUrls: ['./catalog-content.component.scss']
})
export class CatalogContentComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url
      .pipe(
        takeUntil(this.destroy$),
        tap(route => console.log(route[0].path))
      ).subscribe();
    ;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
