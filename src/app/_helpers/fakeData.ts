import { Role } from '../_models/role';

export class FakeData {
  static users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      role: Role.Admin,
    },
    {
      id: 3,
      username: 'user',
      password: 'user',
      firstName: 'Mario',
      lastName: 'Basiricò',
      role: Role.User,
    },
  ]
}