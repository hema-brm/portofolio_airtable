import { UserRole } from '../enums/user-role.enum';

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole; //if in the future we want to add other roles
}
