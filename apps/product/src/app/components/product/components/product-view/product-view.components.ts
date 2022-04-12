
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Product } from 'apps/product/src/app/components/product/model/product.model';
import { createProduct, updateProduct } from 'apps/product/src/app/components/product/store/product.actions';
import { AppState } from 'apps/product/src/app/store/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getRandomId } from 'apps/product/src/app/utils/utils';

@Component({
  selector: 'product-view',
  styleUrls: ['./product-view.component.scss'],
  templateUrl: './product-view.component.html'
})
export class ProductViewComponent  {

  readonly id: number;
  readonly isCreateMode: boolean;
  readonly form: FormGroup;

  constructor(private store: Store<AppState>,
    private readonly fb: FormBuilder,
    private route: ActivatedRoute) {
    const data = this.route.snapshot.data as any;
    this.id = +this.route.snapshot.params['id'];
    this.isCreateMode = !this.id;

    this.form = this.fb.group({
      name: [data.product?.name, Validators.required],
      description: [data.product?.description]
    })
  }
 

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isCreateMode) {
      const product: Product = { id: getRandomId(), name: this.form.value.name, description: this.form.value.description };
      this.store.dispatch(createProduct({ product }));
    } else {
      this.store.dispatch(updateProduct({
        update: {
          id: this.id, changes: {
            name: this.form.value.name,
            description: this.form.value.description
          }
        }
      }));
    }
  }
}