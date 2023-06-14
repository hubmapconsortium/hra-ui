import { NgZone } from "@angular/core";
import { Observable, OperatorFunction } from "rxjs";

export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
    return (source) => {
      return new Observable(observer => {
        const next = (value: T) => zone.run(() => observer.next(value));
        const error = (e: any) => zone.run(() => observer.error(e));
        const complete = () => zone.run(() => observer.complete());
        return source.subscribe({ next, error, complete });
      });
    };
  }