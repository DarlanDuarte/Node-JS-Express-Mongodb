import ServicesUsers from '../services/ServicesUsers';

class UserConttroler {
  async getAll(req, res) {
    const result = await ServicesUsers.todos();
    const id = ['_id'];
    const users = await result.map((user) => ({
      email: user.email,
      _id: user[`${id}`],
    }));

    return res.status(200).json(users);
  }

  async createUser(req, res) {
    const { email, password } = req.body;
    console.log(`pegando email ${email} e senha: ${password}`);

    const { email: mail, _id } = await ServicesUsers.create({ email, password });

    return res.status(200).json({ mail, _id });
  }

  async userDelete(req, res) {
    const { id } = req.params;

    const user = await ServicesUsers.delete({ id });

    return res.status(200).json({ user });
  }

  async updateUser(req, res) {
    const { email, password } = req.body;
    const { id } = req.params;

    const user = await ServicesUsers.updating({ id, email, password });

    return res.status(200).json({ user, msg: `Usuário atualizado com sucesso!` });
  }
}

export default new UserConttroler();
