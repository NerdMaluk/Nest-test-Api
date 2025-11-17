import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/auth/dacorator/get-user.dacorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
// Define a User interface matching your user model
export interface User {
  id: number;
  email: string;
  // add other fields as needed
}

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getme(@GetUser() user: User) {
    return user;
  }
}
