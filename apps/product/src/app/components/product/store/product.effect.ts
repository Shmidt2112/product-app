
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'apps/product/src/app/components/product/services/product.service';
import { productActionTypes } from 'apps/product/src/app/components/product/store/product.actions';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.loadProducts),
      concatMap(() => this.productService.getAllProducts()),
      map(products => productActionTypes.productsLoaded({ products }))
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.createProduct),
      concatMap((action) => this.productService.createProduct(action.product).pipe(
        tap(() => this.router.navigateByUrl('/products'))
      ))
    ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.deleteProduct),
      concatMap((action) => this.productService.deleteProduct(action.productId))
    ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.updateProduct),
      concatMap((action) => this.productService.updateProduct(action.update.id, action.update.changes).pipe(
        tap(() => this.router.navigateByUrl('/products'))
      ))
    ),
    { dispatch: false }
  );

  constructor(private productService: ProductService, private actions$: Actions, private router: Router) { }
}