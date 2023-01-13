import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { products as productsData } from 'app/mock-api/apps/ecommerce/inventory/data';

@Injectable({
    providedIn: 'root'
})
export class ECommerceInventoryMockApi
{
    private _products: any[] = productsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Products - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/products', 300)
            .reply(({request}) => {

                // Get available queries
                const search = request.params.get('search');
                const sort = request.params.get('sort') || 'itemname';
                const order = request.params.get('order') || 'asc';
                const page = parseInt(request.params.get('page') ?? '1', 10);
                const size = parseInt(request.params.get('size') ?? '10', 10);

                // Clone the products
                let products: any[] | null = cloneDeep(this._products);

                // Sort the products
                if ( sort === 'itemname' || sort === 'status' )
                {
                    products.sort((a, b) => {
                        const fieldA = a[sort].toString().toUpperCase();
                        const fieldB = b[sort].toString().toUpperCase();
                        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                    });
                }
                else
                {
                    products.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                }

                // If search exists...
                if ( search )
                {
                    // Filter the products
                    products = products.filter(contact => contact.itemname && contact.itemname.toLowerCase().includes(search.toLowerCase()));
                }

                // Paginate - Start
                const productsLength = products.length;

                // Calculate pagination details
                const begin = page * size;
                const end = Math.min((size * (page + 1)), productsLength);
                const lastPage = Math.max(Math.ceil(productsLength / size), 1);

                // Prepare the pagination object
                let pagination = {};

                // If the requested page number is bigger than
                // the last possible page number, return null for
                // products but also send the last possible page so
                // the app can navigate to there
                if ( page > lastPage )
                {
                    products = null;
                    pagination = {
                        lastPage
                    };
                }
                else
                {
                    // Paginate the results by size
                    products = products.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        length    : productsLength,
                        size      : size,
                        page      : page,
                        lastPage  : lastPage,
                        startIndex: begin,
                        endIndex  : end - 1
                    };
                }

                // Return the response
                return [
                    200,
                    {
                        products,
                        pagination
                    }
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/ecommerce/inventory/product')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the products
                const products = cloneDeep(this._products);

                // Find the product
                const product = products.find(item => item.id === id);

                // Return the response
                return [200, product];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/ecommerce/inventory/product')
            .reply(() => {

                // Generate a new product
                const newProduct = {
                    id         : FuseMockApiUtils.guid(),
                    itemimage   : '',
                    itemname       : 'A New Product',
                    description: '',
                    status     : false
                };

                // Unshift the new product
                this._products.unshift(newProduct);

                // Return the response
                return [200, newProduct];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/ecommerce/inventory/product')
            .reply(({request}) => {

                // Get the id and product
                const id = request.body.id;
                const product = cloneDeep(request.body.product);

                // Prepare the updated product
                let updatedProduct = null;

                // Find the product and update it
                this._products.forEach((item, index, products) => {

                    if ( item.id === id )
                    {
                        // Update the product
                        products[index] = assign({}, products[index], product);

                        // Store the updated product
                        updatedProduct = products[index];
                    }
                });

                // Return the response
                return [200, updatedProduct];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Product - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/ecommerce/inventory/product')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the product and delete it
                this._products.forEach((item, index) => {

                    if ( item.id === id )
                    {
                        this._products.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
    }
}
