import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAdult implements ValidatorConstraintInterface {
  validate(dateOfBirth: Date, args: ValidationArguments) {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    return age >= 18;
  }

  defaultMessage(args: ValidationArguments) {
    return 'You must be at least 18 years old';
  }
}
