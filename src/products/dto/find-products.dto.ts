import { Sort } from '../../common/utils';

export enum ProductSortByEnum {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  PRICE = 'price',
  quantity = 'quantity',
}

interface SortByOptions {
  key?: ProductSortByEnum;
  sort?: Sort;
}

export class FindProductsDto {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: SortByOptions;
}
