import { IPaginationMeta } from 'nestjs-typeorm-paginate'
import { CustomPaginationMeta } from '../libs/nestjs-typeorm-paginate/custom-pagination-meta'

export const getDefaultPage = (page: number) => {
  return page ? page : 1
}

export const getDefaultLimit = (limit: number) => {
  return limit ? limit : 1000
}

export const getPaginationOptions = (page: number, limit: number) => {
  return {
    page: getDefaultPage(page),
    limit: getDefaultLimit(limit),
    metaTransformer: (meta: IPaginationMeta) => new CustomPaginationMeta(meta),
  }
}
