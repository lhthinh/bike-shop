import { IPaginationMeta } from 'nestjs-typeorm-paginate'

export class CustomPaginationMeta implements IPaginationMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
  previousPage: number
  nextPage: number

  constructor(meta: IPaginationMeta) {
    this.totalItems = meta.totalItems
    this.itemCount = meta.itemCount
    this.itemsPerPage = meta.itemsPerPage
    this.totalPages = meta.totalPages
    this.currentPage = meta.currentPage
    this.previousPage = meta.currentPage - 1 || null
    this.nextPage = meta.currentPage < meta.totalPages ? meta.currentPage + 1 : null
  }
}
