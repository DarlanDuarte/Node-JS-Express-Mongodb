import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import connection from '../database/Connection';

const SECRET = 'adsf2a1555fafFDAFAGAG53G5156AG48A4G68S3F58FA84!@#!@%%%$¨%&&¨%$';

class Users {
  constructor() {
    this.login = this.login.bind(this);
    this.findLogin = this.findLogin.bind(this);
  }

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

  async findLogin({ email, password }) {
    const db = await connection();

    const user = await db.collection('users').findOne({ email, password });

    return user;
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await this.findLogin({ email, password });

    if (!user) return res.status(401).json({ error: `Usuário não existe!` });

    const { _id } = user;

    const token = await jwt.sign(
      {
        email,
        userId: _id,
      },
      SECRET,
      {
        expiresIn: '24h',
      }
    );

    return res.status(201).json({ token });
  }
}

export default new Users();
