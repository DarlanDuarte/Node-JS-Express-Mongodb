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

  async delete(id) {
    const user = await Users.existsUsers({ id });

    if (!user) return { msg: `Usuário não existe` };

    const result = await Users.deletando({ id });

    return result;
  }
}

export default new ServicesUsers();
