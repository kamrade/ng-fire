import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  sendMessageURL = 'https://console.firebase.google.com/project/ng-fire-d5b62/database/ng-fire-d5b62/data/messages';

  constructor(private httpClient: HttpClient) { }

  public sendMessage(text: string): Observable<any> {
    return this.httpClient.get(`${this.sendMessageURL}?text=${text}`);
  }
}
