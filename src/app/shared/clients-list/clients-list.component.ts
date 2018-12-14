import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/core/clients.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(private clientsService: ClientsService) {
    this.clientsService.clients$.pipe( takeUntil(this.destroy$) )
      .subscribe(client => {
        console.log(client);
        console.log('::ok');
      }, err => console.log('::err', err));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
