import { User } from '../dtos/User';
import { ViewUserDTO } from '../dtos/responses/view-user.dto';

export class UserBuilder {
  static createViewUser(user: User): ViewUserDTO {
    const { id, email } = user;
    return { id, email };
  }
}
