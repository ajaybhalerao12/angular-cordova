// cordova-plugin-device
import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { Cordova, ZoneObservable } from '@pxblue/angular-cordova';

@Injectable()
export class EmailComposerService {
    constructor(private zone: NgZone) {}

    isAvailable(): Observable<any> {
        return Cordova.deviceready.mergeMap(() => ZoneObservable.create(this.zone, (observer: any) => {
            (<any>window).cordova.plugins.email.isAvailable('gmail', (res: any) => {
                observer.next(res);
                observer.complete();
            });
        }));
    }

    open(to: string[], cc?: string[], bcc?: string[], attachments?: string[],
        subject?: string, body?: string, isHtml?: boolean, type?: string): Observable<any> {
        return Cordova.deviceready.mergeMap(() => ZoneObservable.create(this.zone, (observer: any) => {
            (<any>window).cordova.plugins.email.open({
                to: to, cc: cc, bcc: bcc},
                 (res: any) => {
                observer.next(res);
                observer.complete();
            });
        }));
    }
}
