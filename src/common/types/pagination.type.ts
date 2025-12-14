import { SortOrder } from '../enums/sort-order.enum'

/**
 * Common pagination parameters type.
 */
export type PaginationParams = {
  offset?: number
  limit?: number
}

/**
 * Paginated query type with sorting options.
 * @template TSortField - An enum containing the sortable fields.
 */
export type PaginatedQuery<TSortField> = PaginationParams & {
  sortBy?: TSortField
  sortOrder?: SortOrder
}

/**
 * Paginated query type with search capability.
 * @template TSortField - An enum containing the sortable fields.
 */
export type SearchablePaginatedQuery<TSortField> =
  PaginatedQuery<TSortField> & {
    search?: string
  }
