import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Product } from 'apps/product/src/app/components/product/model/product.model';

var products: Product[] = [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(delay(1000))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/products') && method === 'GET':
                    return getProducts();
                case url.endsWith('/products') && method === 'POST':
                    return createProduct();
                case url.match(/\/products\/\d+$/) && method === 'GET':
                    return getProductById();
                case url.match(/\/products\/\d+$/) && method === 'PUT':
                    return updateProduct();
                case url.match(/\/products\/\d+$/) && method === 'DELETE':
                    return deleteProduct();
                default:
                    return next.handle(request);
            }
        }

        function getProducts() {
            return ok(products);
        }

        function getProductById() {
            const product = products.find(x => x.id === idFromUrl());
            return ok(product);
        }

        function createProduct() {
            let product: Product = body;

            products = [...products, product];

            // localStorage.setItem('products', JSON.stringify(updatedProducts));
            return ok();
        }


        function updateProduct() {
            // ToDo refactor
            let params = body;
         
            const updatedProduct: Product = { id: idFromUrl(), name: params.name, description: params.description }
            let updatedProducts1 = products.filter(x => x.id === idFromUrl());
            //localStorage.setItem('products', JSON.stringify([...updatedProducts1, updatedProduct]));
            products = [...updatedProducts1, updatedProduct];
            return ok();
        }

        function deleteProduct() {
            products = products.filter(x => x.id !== idFromUrl());
            // localStorage.setItem('products', JSON.stringify(product));
            return ok();
        }

        function ok(body?: object) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
