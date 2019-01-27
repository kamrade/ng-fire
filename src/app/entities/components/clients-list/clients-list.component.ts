import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/core/clients.service';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientComplex } from 'src/app/core/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  clients: ClientComplex[];
  isLoading = true;

  constructor(private clientsService: ClientsService) {
    this.clientsService.clients$.pipe( takeUntil(this.destroy$) )
      .subscribe(clients => {
        this.clients = clients;
        this.isLoading = false;
      }, err => console.log('::err', err));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
