import { Article } from './articles';
import { User } from './user';

export class Orders {
  id: number | undefined;
  article: Article | undefined;
  destinatario: User | undefined;
  mittente: User | undefined;
}