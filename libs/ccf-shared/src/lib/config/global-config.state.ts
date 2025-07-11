import { Immutable } from '@angular-ru/cdk/typings';
import { Computed, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { ImmutablePatchValue, ImmutableStateValue } from '@angular-ru/ngxs/typings';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { filterNulls } from 'ccf-shared/rxjs-ext/operators';
import { Observable, OperatorFunction, of } from 'rxjs';
import { distinctUntilChanged, pluck, shareReplay } from 'rxjs/operators';

/** Global config state */
@StateRepository()
@State({
  name: 'globalConfig',
  defaults: null,
})
@Injectable()
export class GlobalConfigState<T> extends NgxsImmutableDataRepository<T> {
  /** Option accessor cache */
  private readonly optionCache = new Map<string, Observable<unknown>>();

  /** Get current config */
  @Computed()
  get config$(): Observable<Immutable<T>> {
    return this.state$.pipe(filterNulls(), shareReplay(1));
  }

  /** Set the config */
  setConfig(config: ImmutableStateValue<T>): void {
    this.setState(config);
  }

  /** Patch the config */
  patchConfig(config: ImmutablePatchValue<T>): void {
    this.patchState(config);
  }

  /** Get a config property */
  getProperty<R>(path: PropertyKey[]): Observable<R> {
    return this.config$.pipe(
      pluck(...(path as [string])) as OperatorFunction<Immutable<T>, R>,
      distinctUntilChanged(),
      shareReplay(1),
    );
  }

  /** Get a config option */
  getOption<K1 extends keyof T>(k1: K1): Observable<T[K1]>;
  /** Get a config option */
  getOption<K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): Observable<T[K1][K2]>;
  /** Get a config option */
  getOption<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    k1: K1,
    k2: K2,
    k3: K3,
  ): Observable<T[K1][K2][K3]>;
  /** Get a config option */
  getOption<R>(...path: (string | number)[]): Observable<R>;
  /** Get a config option */
  getOption(...path: (string | number)[]): Observable<unknown> {
    const key = this.getPathKey(path);
    if (this.optionCache.has(key)) {
      return this.optionCache.get(key) ?? of();
    }

    const obs = this.config$.pipe(pluck(...(path as string[])), distinctUntilChanged(), shareReplay(1));

    this.optionCache.set(key, obs);
    return obs;
  }

  /** Compute a key for a path */
  private getPathKey(path: (string | number)[]): string {
    return `${path.length}:${path.join('.')}`;
  }
}
