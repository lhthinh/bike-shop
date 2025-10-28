import 'dotenv/config'
import * as _ from 'lodash'

export const PORT = _.toNumber(process.argv.slice(2)[0] || process.env.PORT)
export const ENVIRONMENT = process.env.NODE_ENV
export const ENVIRONMENT_ACRONYMS = process.env.NODE_ENV_ACRONYMS || ''
export const PREFIX_PATH = process.env.PREFIX_PATH || ''
export const PREFIX_WEBSOCKET = process.env.PREFIX_WEBSOCKET || ''
export const TIME_ZONE = process.env.TIME_ZONE || 'Asia/Ho_Chi_Minh'

export const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY
export const JWT_ACCESS_TOKEN_SECRET_KEY =
  process.env.JWT_ACCESS_TOKEN_SECRET_KEY

export const MINIO_PRIVATE_URL = process.env.MINIO_PRIVATE_URL || ''
export const MINIO_PUBLIC_URL = process.env.MINIO_PUBLIC_URL || ''

export const TIMES_LOGIN = 5
export const TIMES_LOGIN_FAIL = 5
export const TIMES_LOGIN_TO_LOCK = 10

export const CORS_WHITELIST = process.env.CORS_WHITELIST || ''
