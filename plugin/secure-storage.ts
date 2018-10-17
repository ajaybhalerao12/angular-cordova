// cordova-plugin-secure-storage
import { observable } from 'rxjs/src/internal-compatibility';
import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { Cordova, ZoneObservable } from '@pxblue/angular-cordova';


@Injectable()
export class SecureStorageService {
  storage: any;
  constructor(private zone: NgZone) {}
  /**
   * Creates a namespaced storage.
   * @param store {string}
   * @returns {Observable<any>}
   */
  create(my_store_name: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        const instance = new (<any>window).cordova.plugins.SecureStorage(
          function() {
            observer.next(instance);
            observer.complete();
          },
          function(error) {
            observer.error();
          },
          my_store_name
        );
        this.storage = instance;
      })
    );
  }
  /**
   * Stores a value
   * @param key {string}
   * @param value {string}
   * @returns {Observable<any}
   */
  set(mykey: string, myvalue: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        this.storage.set(
          function(key) {            
            observer.next();
            observer.complete();
          },
          function(error) {
            observer.error();
          },
          mykey,
          myvalue
        );
      })
    );
  }

  /**
   * Gets a stored item
   * @param key {string}
   * @returns {Observable<any}
   */
  get(mykey: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        this.storage.get(
          function(value) {            
            observer.next(value);
            observer.complete();
          },
          function(error) {
            observer.error();
          },
          mykey
        );
      })
    );
  }

  /**
   * Removes a single stored item
   * @param key {string}
   * @returns {Observable<any} returns a promise that resolves with the key that was removed
   */
  remove(mykey: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        this.storage.remove(
          function(key) {
            observer.next();
            observer.complete();
          },
          function(error) {
            observer.error();
          },
          mykey
        );
      })
    );
  }

  /**
   * Get all references from the storage.
   * @returns {Observable<string[]>} returns a promise that resolves with array of keys storage
   */
  getAllKeys(mykey: string): Observable<string[]> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        this.storage.keys(
          function(keys) {
            observer.next(keys);
            observer.complete();
          },
          function(error) {
            observer.error();
          },
          mykey
        );
      })
    );
  }

  // Clear all keys from the storage.
  /**
   * Clear all references from the storage.
   * @returns {Observable<any}
   */
  clearAllKeys(mykey: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        this.storage.clear(
          function(keys) {
            observer.next();
            observer.complete();
          },
          function(error) {
            observer.error();
          },
          mykey
        );
      })
    );
  }
}
