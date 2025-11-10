import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/auth/dacorator/get-user.dacorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import type { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getme(@GetUser() user: User) {
    return user;
  }
}
