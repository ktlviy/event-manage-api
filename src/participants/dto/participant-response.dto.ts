import { Participant } from '@prisma/client';

export class ParticipantResponseDto {
  statusCode!: number;
  message!: string;
  data!: Participant;
}
