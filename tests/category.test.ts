import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { AuthService } from '../src/services/auth.service';

const createCategory = jest.fn();
const token = AuthService.generateToken(
  {
    username: 'admin',
    password: '123',
    email: 'admin@mail.com',
    status: true,
    role: 'Admin',
    createdBy: 'default',
    createdDate: new Date(),
    updatedBy: 'default',
    updatedDate: new Date(),
  },
  process.env.JWT_SECRET
);

describe('POST /v1/category', () => {
  beforeEach(() => {
    createCategory.mockReset();
  });

  describe('Add new category', () => {
    test('should save new category name to database', async () => {
      const newCategory = {
        name: 'Drink',
      };
      const response = await request(app)
        .post('/v1/category')
        .set('Authorization', `Bearer ${token}`)
        .send(newCategory);
      expect(response.body.name).toEqual(newCategory.name);
    });
  });
});
