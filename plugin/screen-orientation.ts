// cordova-plugin-screen-orientation
import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { Cordova, ZoneObservable } from '../';


@Injectable()
export class ScreenOrientationService {
  constructor(private zone: NgZone) {}
  /**
   * Convenience enum for possible orientations
   */
  ORIENTATIONS = {
    PORTRAIT_PRIMARY: 'portrait-primary',
    PORTRAIT_SECONDARY: 'portrait-secondary',
    LANDSCAPE_PRIMARY: 'landscape-primary',
    LANDSCAPE_SECONDARY: 'landscape-secondary',
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
    ANY: 'any'
  };

  /**
   * Listen to orientation change event
   * @return {Observable<void>}
   */
  onChange: Observable<any> = ZoneObservable.create(
    this.zone,
    (observer: any) => {
      (<any>window).addEventListener('orientationchange', observer.next, false);
      return () => {
        (<any>window).removeEventListener(
          'orientationchange',
          observer.next,
          false
        );
      };
    }
  );

  /**
   * Lock the orientation to the passed value.
   * See below for accepted values
   * @param orientation {string} The orientation which should be locked. Accepted values see table above.
   * @return {Observable<any>}
   */
  lock(orientation: string): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        (<any>window).screen.orientation.lock(
          orientation,
          (res: any) => {
            observer.next(res);
            observer.complete();
          },
          observer.error
        );
      })
    );
  }

  /**
   * Unlock and allow all orientations.
   */
  unlock(): Observable<any> {
    return Cordova.deviceready.mergeMap(() =>
      ZoneObservable.create(this.zone, (observer: any) => {
        (<any>window).screen.orientation.unlock((res: any) => {
          observer.next(res);
          observer.complete();
        }, observer.error);
      })
    );
  }
}
