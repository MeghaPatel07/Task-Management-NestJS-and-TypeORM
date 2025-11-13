import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';

import { TeamsService } from './teams.service';

import { CreateTeamDto, UpdateTeamDto, CreateUserDto, UpdateUserDto } from './dto/team.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

 ////////////team////////////
  @Post('team')
  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    try {
      return await this.teamsService.createTeam(createTeamDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get('teams')
  async findAllTeams() {
    try {
      return await this.teamsService.findAllTeams();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get('team/:id')
  async findOneTeam(@Param('id') id: string) {
    try {
      return await this.teamsService.findOneTeam(id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Patch('team/:id')
  async updateTeam(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    try {
      return await this.teamsService.updateTeam(id, updateTeamDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Delete('team/:id')
  async removeTeam(@Param('id') id: string) {
    try {
      return await this.teamsService.removeTeam(id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }


/////////////
  // User
  ///////////
  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.teamsService.createUser(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get('users')
  async findAllUsers() {
    try {
      return await this.teamsService.findAllUsers();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get('user/:id')
  async findOneUser(@Param('id') id: string) {
    try {
      return await this.teamsService.findOneUser(id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Patch('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.teamsService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Delete('user/:id')
  async removeUser(@Param('id') id: string) {
    try {
      return await this.teamsService.removeUser(id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}