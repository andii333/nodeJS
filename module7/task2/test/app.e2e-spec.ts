// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should fail with incorrect credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'wrong', password: 'credentials' })
      .expect(401);
  });

  it('should login successfully', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'maria', password: 'guess' })
      .expect(201);

    return request(app.getHttpServer())
      .get('/task')
      .send({ username: 'maria', password: 'guess' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
