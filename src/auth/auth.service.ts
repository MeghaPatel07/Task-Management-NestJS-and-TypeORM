import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,

  ) {}



  async validateUser(username: string, password: string): Promise<any>
   {

    const validUsername = this.configService.get('HARDCODED_USERNAME');

    const validPassword = this.configService.get('HARDCODED_PASSWORD');

    if (username === validUsername && password === validPassword) 
      {
      return { userId: 1, username: validUsername };
    }

    return null;
  }


  //Get the token to put in header by loggon in 
  async login(user: any) 
  {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  //validate the token of bearer 
  async validateToken(username: string, userId: number) 
  {
    const validUsername = this.configService.get('HARDCODED_USERNAME');
    if (username === validUsername && userId === 1)
       {
      return { userId, username };
    }
    throw new UnauthorizedException();
  }
}