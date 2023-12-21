import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation error',
      errors: this.flattenValidationErrors(exception),
    });
  }

  private flattenValidationErrors(
    errors: ValidationError,
  ): Record<string, string> {
    return errors.constraints
      ? Object.fromEntries(
          Object.entries(errors.constraints).map(([key, value]) => [
            key,
            value,
          ]),
        )
      : {};
  }
}
