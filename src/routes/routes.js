import { Router } from 'express';
import UserConttroler from '../controllers/UserConttroler';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json({ ok: 'Connected' });
});

router.get('/users', UserConttroler.getAll);
router.post('/users', UserConttroler.createUser);
router.delete('/users/:id', UserConttroler.userDelete);
router.put('/users/:id', UserConttroler.updateUser);

export default router;
