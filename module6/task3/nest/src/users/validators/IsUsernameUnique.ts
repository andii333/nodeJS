import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsUsernameUnique implements ValidatorConstraintInterface {
  validate(username: string, args: ValidationArguments) {
    // Логіка перевірки унікальності імені користувача
    // Імітуємо перевірку через БД
    const existingUsernames = ['user1', 'user2'];
    return !existingUsernames.includes(username);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username $value is already taken';
  }
}
