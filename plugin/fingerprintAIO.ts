// cordova-plugin-fingerprint-aio
import { observable } from 'rxjs/src/internal-compatibility';
import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { Cordova, ZoneObservable } from '@pxblue/angular-cordova';


@Injectable()
export class FingerprintAIO {
  constructor(private zone: NgZone) {}

  isAvailable(): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        (<any>window).Fingerprint.isAvailable( (res: any) => {
          console.log('Fingerprint available');
          observer.next(res);
          observer.complete();
        }, err => {
          console.log('Fingerprint is not available');
          observer.error();
        }
      );
      })
    );
  }

  show(clientId: string, clientSecret: string, disableBackup?: boolean,
    localizedFallbackTitle?: string, localizedReason?: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        (<any>window).Fingerprint.show({clientId: clientId, clientSecret: clientSecret,
          disableBackup: disableBackup }, (res: any) => {          
          observer.next(res);
          observer.complete();
        }, err => {          
          observer.error();
        }
      );
      })
    );
  }
}
