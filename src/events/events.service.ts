import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventDto, userId: string) {
    const event = await this.prisma.event.create({
      data: { ...dto, userId },
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Event created successfully',
      data: event,
    };
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    return {
      statusCode: HttpStatus.OK,
      message: 'Events fetched successfully',
      data: events,
    };
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Event fetched successfully',
      data: event,
    };
  }

  async update(id: number, dto: UpdateEventDto, userId: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }
    if (event.userId !== userId) {
      throw new ForbiddenException('You can only update your own events');
    }
    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: { ...dto },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Event updated successfully',
      data: updatedEvent,
    };
  }

  async remove(id: number, userId: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }
    if (event.userId !== userId) {
      throw new ForbiddenException('You can only delete your own events');
    }
    await this.prisma.event.delete({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Event deleted successfully',
    };
  }

  findEventsByParticipant(userId: string) {
    return this.prisma.event.findMany({
      where: { participants: { some: { userId } } },
    });
  }
}
