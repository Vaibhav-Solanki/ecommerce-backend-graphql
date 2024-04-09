import { GraphQLScalarType, Kind } from 'graphql'
import { validateDateTime, validateJSDate } from '../../utils/validator.js'
import { parseDateTime } from '../../utils/formatter.js'

export const name = 'DateTime'

export const resolver = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
        'compliant with the `date-time` format outlined in section 5.6 of ' +
        'the RFC 3339 profile of the ISO 8601 standard for representation ' +
        'of dates and times using the Gregorian calendar.',
  serialize (value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return value
      }
      throw new Error('DateTime cannot represent an invalid Date instance')
    } else if (typeof value === 'string') {
      if (validateDateTime(value)) {
        return parseDateTime(value)
      }
      throw new Error(`DateTime cannot represent an invalid date-time-string ${value}.`)
    } else if (typeof value === 'number') {
      try {
        return new Date(value)
      } catch (e) {
        throw new Error('DateTime cannot represent an invalid Unix timestamp ' + value)
      }
    } else {
      throw new Error('DateTime cannot be serialized from a non string, ' +
                'non numeric or non Date type ' +
                JSON.stringify(value))
    }
  },
  parseValue (value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return value
      }
      throw new Error('DateTime cannot represent an invalid Date instance')
    }
    if (typeof value === 'string') {
      if (validateDateTime(value)) {
        return parseDateTime(value)
      }
      throw new Error(`DateTime cannot represent an invalid date-time-string ${value}.`)
    }
    throw new Error(`DateTime cannot represent non string or Date type ${JSON.stringify(value)}`)
  },
  parseLiteral (ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`DateTime cannot represent non string or Date type ${'value' in ast && ast.value}`)
    }
    const { value } = ast
    if (validateDateTime(value)) {
      return parseDateTime(value)
    }
    throw new Error(`DateTime cannot represent an invalid date-time-string ${String(value)}.`)
  },
  extensions: {
    codegenScalarType: 'Date | string',
    jsonSchema: {
      type: 'string',
      format: 'date-time'
    }
  }
})
