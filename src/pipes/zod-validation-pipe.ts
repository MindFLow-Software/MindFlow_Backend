import { PipeTransform, BadRequestException } from '@nestjs/common'
import { fromZodError } from 'zod-validation-error'

import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: fromZodError(error),
          message: 'Validation failed',
          statusCode: 400,
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}

// Luis Morato é muito chupa do Diego Fernandes, mas é um cara legal
