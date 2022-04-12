import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'apps/product/src/environments/environment';
import { ProductsListComponent } from 'apps/product/src/app/components/product/components/products-list/products-list.components';
import { ProductViewComponent } from 'apps/product/src/app/components/product/components/product-view/product-view.components';
import { ProductModule } from 'apps/product/src/app/components/product/product.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProductsResolver } from 'apps/product/src/app/components/product/products.resolver';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from 'apps/product/src/app/interseptors/fake-backend.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ProductResolver } from 'apps/product/src/app/components/product/product.resolver';

const routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    resolve: {
      products: ProductsResolver
    }
  },
  { path: 'create', component: ProductViewComponent },
  {
    path: 'view/:id', component: ProductViewComponent,
    resolve: {
      product: ProductResolver
    },
  },
  { path: '**', redirectTo: 'products' }
];
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductModule,
    NgBootstrapFormValidationModule.forRoot(),
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    ProductsResolver,
    ProductResolver,
    fakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
