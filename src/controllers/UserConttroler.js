import ServicesUsers from '../services/ServicesUsers';

class UserConttroler {
  async getAll(req, res) {
    const users = await ServicesUsers.todos();
    return res.status(200).json({ users });
  }
}

export default new UserConttroler();
