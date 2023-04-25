import connection from '../database/Connection';

class Users {
  async getAll() {
    const db = await connection();

    return db.collection('users').find().toArray();
  }

  async newUser({ email, password }) {
    console.log(`pegando novamente email: ${email} e senha: ${password}`);
    const db = await connection();
    const user = db.collection('users').insertOne({ email, password });
    const { insertedId: _id } = user;

    return { email, _id };
  }

  async existsUsers({ email, uuid }) {
    const db = await connection();
    let user = null;

    if (uuid) {
      user = await db.collection('users').findOne({ uuid });
    } else {
      user = await db.collection('users').findOne({ email });
    }

    return user;
  }
}

export default new Users();
