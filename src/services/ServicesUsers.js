import Users from '../models/Users';

class ServicesUsers {
  async todos() {
    const users = await Users.getAll();

    return users;
  }

  async create({ email, password }) {
    console.log(`recebendo email: ${email} e senha: ${password}`);
    const existUser = await Users.existsUsers({ email });

    if (existUser) return existUser;

    const user = await Users.newUser({ email, password });

    return user;
  }
}

export default new ServicesUsers();
