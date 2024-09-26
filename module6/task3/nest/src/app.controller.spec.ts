import { validate } from 'class-validator';
import { CreateUserDto } from './users/dto/create-user.dto';

describe('User validation', () => {
  it('should fail if username is not unique', async () => {
    const dto = new CreateUserDto();
    dto.username = 'user1';
    dto.email = 'test@example.com';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('IsUsernameUnique');
  });

  it('should fail if user is under 18', async () => {
    const dto = new CreateUserDto();
    dto.username = 'user123';
    dto.email = 'test@example.com';
    dto.password = 'password123';
    dto.dateOfBirth = new Date('2010-01-01');

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('IsAdult');
  });
});
