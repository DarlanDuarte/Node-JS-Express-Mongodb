import Users from '../models/Users';

class ServicesUsers {
  async todos() {
    const users = await Users.getAll();

    return users;
  }
}

export default new ServicesUsers();
