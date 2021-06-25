import { setTokenSourceMapRange } from 'typescript';
import { Role } from './role';

export class User {
  id: number | undefined;
  username: string | undefined;
  email: string | undefined;
  city: string | undefined;
  cap: number | undefined;
  indirizzo: string| undefined;
  role: Role | undefined;
  token?: string;

  setToken(token: string) {
    this.token = token;
  }
}
