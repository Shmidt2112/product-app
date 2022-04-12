import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'apps/product/src/app/components/product/services/product.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsListComponent } from 'apps/product/src/app/components/product/components/products-list/products-list.components';
import { ProductViewComponent } from 'apps/product/src/app/components/product/components/product-view/product-view.components';
import { ProductEffects } from 'apps/product/src/app/components/product/store/product.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productReducer } from 'apps/product/src/app/components/product/store/product.reducer';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [
    ProductsListComponent,
    ProductViewComponent
  ],
  providers: [ProductService]
})
export class ProductModule { }
