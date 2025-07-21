import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './model/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@email.com',
        },
        password: {
          type: 'string',
          example: 'string',
        },
      },
      required: ['email', 'password'],
    },
  })
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @IsPublic()
  @Post('refresh')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
          example: 'string',
        },
      },
      required: ['refresh_token'],
    },
  })
  async refresh(@Body() refreshDto: { refresh_token: string }) {
    if (!refreshDto.refresh_token) {
      throw new UnauthorizedException('Refresh token é obrigatório');
    }
    return this.authService.refreshToken(refreshDto.refresh_token);
  }
}
