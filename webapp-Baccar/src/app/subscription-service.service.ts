import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionServiceService {

  constructor() { }
  subscription: Subscription;
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
