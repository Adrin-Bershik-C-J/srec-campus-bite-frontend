import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _isAuthenticated = signal(false);

  get isAuthenticated() {
    return this._isAuthenticated.asReadonly();
  }

  setAuthenticated(value: boolean) {
    this._isAuthenticated.set(value);
  }
}
