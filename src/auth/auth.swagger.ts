import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export const registerSwagger = [
  ApiOperation({ summary: 'Register a new user' }),
  ApiBody({ type: RegisterDto }),
  ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'User registered successfully',
        data: {
          id: 'user_cuid',
          username: 'test',
          email: 'test@email.com',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  }),
];

export const loginSwagger = [
  ApiOperation({ summary: 'Login a user' }),
  ApiBody({ type: LoginDto }),
  ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'User logged in successfully',
        data: {
          access_token: 'jwt_token_here',
        },
      },
    },
  }),
];

export const logoutSwagger = [
  ApiOperation({ summary: 'Logout a user' }),
  ApiResponse({
    status: 200,
    description: 'User logged out successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'User logged out successfully',
      },
    },
  }),
];
