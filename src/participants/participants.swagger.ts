import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const joinParticipantSwagger = [
  ApiOperation({ summary: 'Join an event as a participant' }),
  ApiResponse({
    status: 201,
    description: 'Participant successfully registered',
    schema: {
      example: {
        statusCode: 201,
        message: 'Participant successfully registered',
        data: {
          id: 'participant_cuid',
          eventId: 'event_cuid',
          userId: 'user_cuid',
        },
      },
    },
  }),
  ApiResponse({
    status: 400,
    description: 'eventId and userId are required or event is full',
  }),
  ApiResponse({ status: 404, description: 'Event not found' }),
  ApiResponse({
    status: 409,
    description: 'User is already a participant in this event',
  }),
];

export const getByEventSwagger = [
  ApiOperation({ summary: 'Get all participants for a specific event' }),
  ApiResponse({
    status: 200,
    description: 'List of participants for the event',
    schema: {
      example: {
        statusCode: 200,
        data: [
          {
            id: 'participant_cuid',
            eventId: 'event_cuid',
            userId: 'user_cuid',
          },
        ],
      },
    },
  }),
  ApiResponse({
    status: 404,
    description: 'No participants found for this event',
  }),
];

export const getByUserSwagger = [
  ApiOperation({ summary: 'Get all events a user is participating in' }),
  ApiResponse({
    status: 200,
    description: 'List of events for the user',
    schema: {
      example: {
        statusCode: 200,
        data: [
          {
            id: 'event_cuid',
            name: 'Event Name',
            description: 'Event Description',
          },
        ],
      },
    },
  }),
  ApiResponse({ status: 400, description: 'userId is required' }),
  ApiResponse({ status: 404, description: 'No events found for this user' }),
];
