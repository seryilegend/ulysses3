import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthControllerInterface } from './interface/auth-controller.interface';
import { AuthReqDto } from './dto/auth-req.dto';
import { AuthResDto } from './dto/auth-res.dto';

@Controller('auth')
export class AuthController implements AuthControllerInterface {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(authReqDto: AuthReqDto): Promise<AuthResDto> {
    try {
      return this.authService.register(authReqDto);
    } catch (e) {
      throw e;
    }
  }
  @Post('login')
  login(authReqDto: AuthReqDto): Promise<AuthResDto> {
    try {
      return this.authService.login(authReqDto);
    } catch (e) {
      throw e;
    }
  }
}
