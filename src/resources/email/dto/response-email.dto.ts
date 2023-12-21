import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ResponseEmailDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'The field to must be a string' })
  @IsNotEmpty({ message: 'The field to is required' })
  to: string;

  @ApiProperty({ type: String })
  @IsString({ message: 'The field from must be a string' })
  @IsNotEmpty({ message: 'The field from is required' })
  from: string;

  @ApiProperty({ type: Array<Blob> })
  @IsArray({
    message: 'The field attachments must be a valid list of attachments',
  })
  @IsNotEmpty({ message: 'Every attachment is required', each: true })
  attachments: Array<Express.Multer.File>;
}
