import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class ParticipantsService {
  constructor(
    private prisma: PrismaService,
    private eventsService: EventsService,
  ) {}

  async joinParticipant(eventId: number, userId: string) {
    if (!eventId) {
      throw new BadRequestException('eventId and userId are required');
    }
    const event = await this.eventsService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const currentCount = await this.countParticipants(eventId);
    if (currentCount >= event.data.maxParticipants) {
      throw new ConflictException(
        'Event has reached the maximum number of participants',
      );
    }
    const alreadyJoined = await this.isUserParticipant(eventId, userId);
    if (alreadyJoined) {
      throw new ConflictException(
        'User is already a participant in this event',
      );
    }
    const participant = await this.prisma.participant.create({
      data: { eventId, userId },
    });
    return {
      statusCode: 201,
      message: 'Participant successfully registered',
      data: participant,
    };
  }

  async findByEvent(eventId: number) {
    const participants = await this.prisma.participant.findMany({
      where: { eventId },
      include: { user: true },
    });
    if (!participants || participants.length === 0) {
      throw new NotFoundException('No participants found for this event');
    }
    return {
      statusCode: 200,
      data: participants,
    };
  }

  async findByUser(userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    const participants = await this.prisma.participant.findMany({
      where: { userId },
      include: { event: true },
    });
    if (!participants || participants.length === 0) {
      throw new NotFoundException('No events found for this user');
    }
    return {
      statusCode: 200,
      data: participants,
    };
  }

  countParticipants(eventId: number) {
    return this.prisma.participant.count({
      where: { eventId },
    });
  }
  isUserParticipant(eventId: number, userId: string) {
    return this.prisma.participant.findFirst({
      where: { eventId, userId },
    });
  }
}
