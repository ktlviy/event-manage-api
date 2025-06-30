import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Request,
  Patch,
  applyDecorators,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public } from 'src/auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  createEventSwagger,
  findAllEventsSwagger,
  findOneEventSwagger,
  updateEventSwagger,
  deleteEventSwagger,
} from './events.swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @applyDecorators(...createEventSwagger)
  async create(@Request() req, @Body() dto: CreateEventDto) {
    return this.eventsService.create(dto, req.user.id);
  }

  @Public()
  @Get()
  @applyDecorators(...findAllEventsSwagger)
  async findAll() {
    return this.eventsService.findAll();
  }

  @Public()
  @Get(':id')
  @applyDecorators(...findOneEventSwagger)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @applyDecorators(...updateEventSwagger)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: UpdateEventDto,
  ) {
    console.log(req);
    return this.eventsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @applyDecorators(...deleteEventSwagger)
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.eventsService.remove(id, req.user.id);
  }
}
