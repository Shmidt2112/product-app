import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product } from 'apps/product/src/app/components/product/model/product.model';


export const loadProducts = createAction(
    '[Product] Load Products',
);

export const productsLoaded = createAction(
    '[Product] Products Loaded Successfully',
    props<{ products: Product[] }>()
); 

export const productLoaded = createAction(
    '[Product] Product Loaded Successfully',
    props<{ product: Product }>()
);

export const createProduct = createAction(
    '[Product] Create Product',
    props<{ product: Product }>()
);

export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ productId: number }>()
);

export const updateProduct = createAction(
    '[Product] Update Product',
    props<{ update: Update<Product> }>()
);

export const productActionTypes = {
    loadProducts,
    productsLoaded,
    productLoaded,
    createProduct,
    deleteProduct,
    updateProduct,
};