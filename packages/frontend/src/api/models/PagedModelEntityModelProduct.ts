/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityModelProduct } from './EntityModelProduct';
import type { Links } from './Links';
import type { PageMetadata } from './PageMetadata';

export type PagedModelEntityModelProduct = {
    _embedded?: {
products?: Array<EntityModelProduct>;
};
    _links?: Links;
    page?: PageMetadata;
};
