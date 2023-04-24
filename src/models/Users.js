import connection from '../database/Connection';

class Users {
  async getAll() {
    const db = await connection();

    return db.collection('users').find().toArray();
  }
}

export default new Users();
