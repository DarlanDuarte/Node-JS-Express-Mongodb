import ServicesUsers from '../services/ServicesUsers';

class UserConttroler {
  async getAll(req, res) {
    const users = await ServicesUsers.todos();
    return res.status(200).json({ users });
  }

  async createUser(req, res) {
    const { email, password } = req.body;
    console.log(`pegando email ${email} e senha: ${password}`);

    const { email: mail, _id } = await ServicesUsers.create({ email, password });

    return res.status(200).json({ mail, _id });
  }
}

export default new UserConttroler();
