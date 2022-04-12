
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState, selectAll } from 'apps/product/src/app/components/product/store/product.reducer';

export const productFeatureSelector = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
  productFeatureSelector,
  selectAll
); 

export const getProductById = (id: number) => createSelector(
  getAllProducts,
  products => products.find(x => x.id === id)
);

export const areProductsLoaded = createSelector(
  productFeatureSelector,
  state => state.productsLoaded
);