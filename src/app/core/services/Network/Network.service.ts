import { Observable, Observer, fromEvent, merge } from 'rxjs';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((subject: Observer<boolean>) => {
        subject.next(navigator.onLine);
        subject.complete();
      })
    );
  }
}
