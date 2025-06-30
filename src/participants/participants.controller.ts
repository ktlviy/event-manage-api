import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Request,
  applyDecorators,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { JoinParticipantDto } from './dto/join-participant.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  joinParticipantSwagger,
  getByEventSwagger,
  getByUserSwagger,
} from './participants.swagger';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private service: ParticipantsService) {}

  @Post('join')
  @applyDecorators(...joinParticipantSwagger)
  async joinParticipant(@Body() dto: JoinParticipantDto, @Request() req) {
    return this.service.joinParticipant(dto.eventId, req.user.id);
  }

  @Get('event/:eventId')
  @applyDecorators(...getByEventSwagger)
  async getByEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.service.findByEvent(eventId);
  }

  @Get('user/:userId')
  @applyDecorators(...getByUserSwagger)
  async getByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }
}
