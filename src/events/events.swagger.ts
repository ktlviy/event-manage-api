import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

export const createEventSwagger = [
  ApiOperation({ summary: 'Create a new event' }),
  ApiBody({ type: CreateEventDto }),
  ApiResponse({
    status: 201,
    description: 'Event created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Event created successfully',
        data: {
          id: 'event_cuid',
          name: 'Event Name',
          description: 'Event Description',
          date: '2024-01-01T00:00:00.000Z',
          location: 'Event Location',
          maxParticipants: 100,
          userId: 'user_cuid',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  }),
];

export const findAllEventsSwagger = [
  ApiOperation({ summary: 'Get all events' }),
  ApiResponse({
    status: 200,
    description: 'Events fetched successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Events fetched successfully',
        data: [
          {
            id: 'event_cuid',
            name: 'Event Name',
            description: 'Event Description',
            date: '2024-01-01T00:00:00.000Z',
            location: 'Event Location',
            maxParticipants: 100,
            userId: 'user_cuid',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      },
    },
  }),
];

export const findOneEventSwagger = [
  ApiOperation({ summary: 'Get an event by ID' }),
  ApiResponse({
    status: 200,
    description: 'Event fetched successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Event fetched successfully',
        data: {
          id: 'event_cuid',
          name: 'Event Name',
          description: 'Event Description',
          date: '2024-01-01T00:00:00.000Z',
          location: 'Event Location',
          maxParticipants: 100,
          userId: 'user_cuid',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  }),
];

export const updateEventSwagger = [
  ApiOperation({ summary: 'Update an event' }),
  ApiBody({ type: UpdateEventDto }),
  ApiResponse({
    status: 200,
    description: 'Event updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Event updated successfully',
        data: {
          id: 'event_cuid',
          name: 'Event Name',
          description: 'Event Description',
          date: '2024-01-01T00:00:00.000Z',
          location: 'Event Location',
          maxParticipants: 100,
          userId: 'user_cuid',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  }),
];

export const deleteEventSwagger = [
  ApiOperation({ summary: 'Delete an event' }),
  ApiResponse({
    status: 200,
    description: 'Event deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Event deleted successfully',
        data: {
          id: 'event_cuid',
          name: 'Event Name',
          description: 'Event Description',
          date: '2024-01-01T00:00:00.000Z',
          location: 'Event Location',
          maxParticipants: 100,
          userId: 'user_cuid',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  }),
];
