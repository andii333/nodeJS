import {
  IsEmail,
  IsNotEmpty,
  Length,
  Min,
  Max,
  IsDate,
  IsOptional,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsAdult } from '../validators/IsAdult';
import { IsUsernameUnique } from '../validators/IsUsernameUnique';
import 'reflect-metadata';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  @Validate(IsUsernameUnique)
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
  password: string;

  @IsOptional()
  @IsDate({ message: 'Date of birth must be a valid date' })
  @Type(() => Date)
  @Validate(IsAdult, { message: 'You must be at least 18 years old' })
  dateOfBirth: Date;
}
