/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EntityModelProduct } from '../models/EntityModelProduct';
import type { PagedModelEntityModelProduct } from '../models/PagedModelEntityModelProduct';
import type { ProductRequestBody } from '../models/ProductRequestBody';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductEntityControllerService {

    /**
     * get-product
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PagedModelEntityModelProduct OK
     * @throws ApiError
     */
    public static getCollectionResourceProductGet1(
page?: number,
size: number = 20,
sort?: Array<string>,
): CancelablePromise<PagedModelEntityModelProduct> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * create-product
     * @param requestBody 
     * @returns EntityModelProduct Created
     * @throws ApiError
     */
    public static postCollectionResourceProductPost(
requestBody: ProductRequestBody,
): CancelablePromise<EntityModelProduct> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-product
     * @param id 
     * @returns EntityModelProduct OK
     * @throws ApiError
     */
    public static getItemResourceProductGet(
id: string,
): CancelablePromise<EntityModelProduct> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-product
     * @param id 
     * @param requestBody 
     * @returns EntityModelProduct OK
     * @throws ApiError
     */
    public static putItemResourceProductPut(
id: string,
requestBody: ProductRequestBody,
): CancelablePromise<EntityModelProduct> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-product
     * @param id 
     * @returns void 
     * @throws ApiError
     */
    public static deleteItemResourceProductDelete(
id: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-product
     * @param id 
     * @param requestBody 
     * @returns EntityModelProduct OK
     * @throws ApiError
     */
    public static patchItemResourceProductPatch(
id: string,
requestBody: ProductRequestBody,
): CancelablePromise<EntityModelProduct> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
