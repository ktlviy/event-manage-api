import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinParticipantDto {
  @ApiProperty({ example: 1, description: 'ID of the event to join' })
  @IsNotEmpty()
  @IsNumber()
  eventId!: number;

  @ApiProperty({
    example: 'user-123',
    description: 'ID of the user joining the event',
  })
  @IsNotEmpty()
  @IsString()
  userId!: string;
}
