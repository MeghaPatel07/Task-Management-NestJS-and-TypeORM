import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsMongoId()
  teamId?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsMongoId()
  teamId?: string;
}