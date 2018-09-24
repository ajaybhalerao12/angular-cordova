"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// cordova-plugin-screen-orientation
var core_1 = require("@angular/core");
require("rxjs/add/operator/mergeMap");
var __1 = require("../");
var ORIENTATIONS;
(function (ORIENTATIONS) {
    ORIENTATIONS["PORTRAIT_PRIMARY"] = "portrait-primary";
    ORIENTATIONS["PORTRAIT_SECONDARY"] = "portrait-secondary";
    ORIENTATIONS["LANDSCAPE_PRIMARY"] = "landscape-primary";
    ORIENTATIONS["LANDSCAPE_SECONDARY"] = "landscape-secondary";
    ORIENTATIONS["PORTRAIT"] = "portrait";
    ORIENTATIONS["LANDSCAPE"] = "landscape";
    ORIENTATIONS["ANY"] = "any";
})(ORIENTATIONS = exports.ORIENTATIONS || (exports.ORIENTATIONS = {}));

    var ScreenOrientationService = /** @class */ (function () {
    function ScreenOrientationService(zone) {
        this.zone = zone;
        this.onChange = __1.ZoneObservable.create(this.zone, function (observer) {
          window.addEventListener('orientationchange', observer.next, false);
          return function () {
              window.removeEventListener('orientationchange', observer.next, false);
          };
      });
    }

    ScreenOrientationService.prototype.unlock = function () {
        var _this = this;
        return __1.Cordova.deviceready.mergeMap(function () { return __1.ZoneObservable.create(_this.zone, function (observer) {
            window.screen.orientation.unlock(function (res) {
                observer.next(res);
                observer.complete();
            },observer.error);
        }); });
    };

    ScreenOrientationService.prototype.lock = function (orientation) {
      var _this = this;
      return __1.Cordova.deviceready.mergeMap(function () { return __1.ZoneObservable.create(_this.zone, function (observer) {
          window.screen.orientation.lock(orientation, function (res) {
              observer.next(res);
              observer.complete();
          },observer.error);
      }); });
  };

    ScreenOrientationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], ScreenOrientationService);
    return ScreenOrientationService;
}());
exports.ScreenOrientationService = ScreenOrientationService;
