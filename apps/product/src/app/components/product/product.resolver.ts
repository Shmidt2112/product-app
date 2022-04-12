
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { first, mergeMap, Observable } from 'rxjs';
import { ProductService } from 'apps/product/src/app/components/product/services/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'apps/product/src/app/store/reducers';
import { areProductsLoaded, getProductById } from 'apps/product/src/app/components/product/store/product.selectors';

@Injectable()
export class ProductResolver implements Resolve<Observable<any>> {

  constructor(private productService: ProductService,
    private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areProductsLoaded),
        mergeMap(productsLoaded => productsLoaded ? 
          this.store.pipe(select(getProductById((+route.paramMap.get('id')!))))
        : this.productService.getById(+route.paramMap.get('id')!)),
        first()
    );
  }
}