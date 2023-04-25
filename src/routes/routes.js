import { Router } from 'express';
import UserConttroler from '../controllers/UserConttroler';
import Users from '../models/Users';
import Authetication from '../middlewares/Authentication';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json({ ok: 'Connected' });
});

router.get('/users', Authetication, UserConttroler.getAll);
router.post('/users', Authetication, UserConttroler.createUser);
router.delete('/users/:id', Authetication, UserConttroler.userDelete);
router.put('/users/:id', Authetication, UserConttroler.updateUser);

router.get('/login', Users.login);

export default router;
