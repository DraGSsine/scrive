// auth.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signIn(@Req() req) {
    return this.authService.signin(req.user);
  }

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.createUserWithPassword(
        body.email,
        body.password,
      );
      return this.authService.signin(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { access_token } = await this.authService.signin(req.user);
    const redirectUrl = this.configService.get<string>('FRONTEND_URL');
    res.redirect(`${redirectUrl}/auth/signin?token=${access_token}`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req) {
    return req.user;
  }
}