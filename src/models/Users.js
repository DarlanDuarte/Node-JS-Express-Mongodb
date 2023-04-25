import { ObjectId } from 'mongodb';
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

  async existsUsers({ email, id }) {
    const db = await connection();
    let user = null;

    if (id) {
      user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    } else {
      user = await db.collection('users').findOne({ email });
    }

    return user;
  }

  async deletando({ id }) {
    const db = await connection();

    await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    return { id };
  }

  async update({ id, email, password }) {
    const db = await connection();

    await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { email, password } });
    console.log(id, email);
    return { id, email };
  }
}

export default new Users();
