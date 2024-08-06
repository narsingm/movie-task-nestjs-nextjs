export type PaginationApiResponse<List> = {
  list: List[]
  totalPages: number
  currentPage: number
}