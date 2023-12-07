/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EntityModelProduct } from '../models/EntityModelProduct';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductSearchControllerService {

    /**
     * @param gtin 
     * @returns EntityModelProduct OK
     * @throws ApiError
     */
    public static executeSearchProductGet(
gtin?: string,
): CancelablePromise<EntityModelProduct> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/search/findFirstByGtin',
            query: {
                'gtin': gtin,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
