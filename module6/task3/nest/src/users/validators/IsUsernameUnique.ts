import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsUsernameUnique implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    const existingUsernames = ['user1', 'user2'];
    return !existingUsernames.includes(username);
  }
}
