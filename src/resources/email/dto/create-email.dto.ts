import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({ type: Blob, format: 'binary' })
  email: Express.Multer.File;

  @ApiProperty({ type: Boolean, example: false })
  @IsDefined({ message: 'The field show headers is required' })
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return value;
    }
    return value === 'true'
      ? true
      : value === 'false'
        ? false
        : (() => {
            throw new BadRequestException(
              'The field show headers must be true or false',
            );
          })();
  })
  showHeaders: boolean;
}
