import { Transform, TransformOptions } from 'class-transformer'
import _ from 'lodash'
import { isJsonString } from 'src/common/utils/validator.util'

export const Trim = (options?: TransformOptions) => {
  return Transform(({ value }) => value?.toString()?.trim(), options)
}

export const ToLowerCase = (options?: TransformOptions) => {
  return Transform(({ value }) => value?.toString()?.toLowerCase(), options)
}

export const ToUpperCase = (options?: TransformOptions) => {
  return Transform(({ value }) => value?.toString()?.toUpperCase(), options)
}

export const ParseBoolean = (options?: TransformOptions) => {
  return Transform(({ value }) => _.eq(value?.toString()?.trim()?.toLowerCase(), 'true'), options)
}

export const ParseBooleanOrUndefined = (options?: TransformOptions) => {
  return Transform(({ value }) => {
    if (!_.isNil(value)) {
      return _.eq(value?.toString()?.trim()?.toLowerCase(), 'true')
    }
    return undefined
  }, options)
}

export const ParseNilStringToUndefined = (options?: TransformOptions) => {
  return Transform(({ value }) => {
    if (_.includes(['null', 'undefined'], value)) {
      return undefined
    }
    return value
  }, options)
}

export const ParseJsonObject = (options?: TransformOptions) => {
  return Transform(
    ({ value }) => {
      if (value && isJsonString(value)) {
        return JSON.parse(value)
      }
      return {}
    },
    { ...options, toPlainOnly: true },
  )
}

export const ParseJsonArray = (options?: TransformOptions) => {
  return Transform(
    ({ value }) => {
      if (value && isJsonString(value)) {
        return JSON.parse(value)
      }
      return []
    },
    { ...options, toPlainOnly: true },
  )
}

/**
 * Only work with options toPlainOnly = true
 */
export const OmitNilProperties = (options?: TransformOptions) => {
  return Transform(({ value }) => _.omitBy(value, _.isNil), { ...options, toPlainOnly: true })
}
