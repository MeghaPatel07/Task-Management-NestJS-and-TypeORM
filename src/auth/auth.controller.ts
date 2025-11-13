import { Controller, Post, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.username,
        loginDto.password,
      );

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}