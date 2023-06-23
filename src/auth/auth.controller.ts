import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthLoginDto } from './dto/auth-login.dto';

import { AuthService } from './auth.service';
import { UserObj } from '../common/decorators/userobj.decorator';
import { User } from '../user/entities/user.entity';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(
    @UserObj() user: User,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.logout(user, res);
  }

}
