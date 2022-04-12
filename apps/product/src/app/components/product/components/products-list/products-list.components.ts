import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Product } from 'apps/product/src/app/components/product/model/product.model';
import { ProductService } from 'apps/product/src/app/components/product/services/product.service';
import { AppState } from 'apps/product/src/app/store/reducers';
import { productActionTypes } from 'apps/product/src/app/components/product/store/product.actions';
import { getAllProducts } from 'apps/product/src/app/components/product/store/product.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'products-list',
  styleUrls: ['./products-list.component.scss'],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent {

  readonly products$: Observable<Product[]>;

  constructor(private store: Store<AppState>,
    private router: Router) {
    this.products$ = this.store.select(getAllProducts);
  } 

  deleteProduct(productId: number) {
    this.store.dispatch(productActionTypes.deleteProduct({ productId }));
  } 

  navigateToProduct(productId: number) {
    this.router.navigateByUrl('/view/' + productId);
  }
}