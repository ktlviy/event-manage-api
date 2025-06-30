import {
  IsOptional,
  IsString,
  IsDateString,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    description: 'The name of the event',
    example: 'Event Name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'The name of the event',
    example: 'Event Name',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    description: 'The description of the event',
    example: 'Event Description',
  })
  description?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The date of the event',
    example: '2024-01-01T00:00:00.000Z',
  })
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'The location of the event',
    example: 'Event Location',
  })
  location?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'The maximum number of participants for the event',
    example: 100,
  })
  maxParticipants?: number;
}
