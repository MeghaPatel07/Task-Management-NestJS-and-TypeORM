import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';
import { CreateTeamDto, UpdateTeamDto, CreateUserDto, UpdateUserDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  ////////////////////////team///////////////

  //create
  async createTeam(createTeamDto: CreateTeamDto): Promise<Team>
   {
    const team = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(team);
  }

  //getAll
  async findAllTeams(): Promise<any[]> 
  {
    const teams = await this.teamRepository.find({
      order: { createdAt: 'DESC' },
    });
 
    const teamsWithMembers = await Promise.all(
      teams.map(async (team) =>
         {
        const members = await this.userRepository.find({
          where: { teamId: team.id },
        });
        return {
          ...team,
          members,
        };
      })
    );

    return teamsWithMembers;
  }


  //findById
  async findOneTeam(id: string): Promise<any> 
  {
    const team = await this.teamRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

   
    const members = await this.userRepository.find({
      where: { teamId: team.id },
    });

    return {
      ...team,
      members,
    };
  }


  //patch/Update
  async updateTeam(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    
    Object.assign(team, updateTeamDto);
    return this.teamRepository.save(team);
  }


  //delete
  async removeTeam(id: string): Promise<void> {
    const team = await this.teamRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    
    await this.teamRepository.remove(team);
  }

  ////////user////////////

//create
  async createUser(createUserDto: CreateUserDto): Promise<User> {
 
    if (createUserDto.teamId) {
      await this.findOneTeam(createUserDto.teamId);
    }

    const user = this.userRepository.create({
      ...createUserDto,
      teamId: createUserDto.teamId || null,
    });
    return this.userRepository.save(user);
  }


  //getAll
  async findAllUsers(): Promise<any[]> {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
 
    const usersWithTeam = await Promise.all(
      users.map(async (user) => {
        let team = null;
        if (user.teamId) {
          try {
            team = await this.teamRepository.findOne({
              where: { _id: new ObjectId(user.teamId) },
            });
          } catch (error) {
            // ignore
          }
        }
        return {
          ...user,
          team,
        };
      })
    );

    return usersWithTeam;
  }


  //FindUserByid
  async findOneUser(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
 
    let team = null;
    if (user.teamId) {
      try {
        team = await this.teamRepository.findOne({
          where: { _id: new ObjectId(user.teamId) },
        });
      } catch (error) {
        //ignore
      }
    }

    return {
      ...user,
      team,
    };
  }


  //update user
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
     
    if (updateUserDto.teamId) {
      await this.findOneTeam(updateUserDto.teamId);
    }

    const updateData = {
      ...updateUserDto,
      teamId: updateUserDto.teamId !== undefined ? updateUserDto.teamId : user.teamId,
    };

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }


  //delete user/////////
  async removeUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    await this.userRepository.remove(user);
  }
}