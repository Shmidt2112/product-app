
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { loadProducts } from 'apps/product/src/app/components/product/store/product.actions';
import { AppState } from 'apps/product/src/app/store/reducers';
import { areProductsLoaded } from 'apps/product/src/app/components/product/store/product.selectors';

@Injectable()
export class ProductsResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areProductsLoaded),
        tap((productsLoaded) => {
          if (!productsLoaded) {
            this.store.dispatch(loadProducts());
          }
        }),
        filter(productsLoaded => productsLoaded),
        first()
    );
  }
}