import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsService } from 'src/events/events.service';

@Module({
  imports: [PrismaModule],
  providers: [ParticipantsService, EventsService],
  controllers: [ParticipantsController],
})
export class ParticipantsModule {}
