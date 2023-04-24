import { Router } from 'express';
import UserConttroler from '../controllers/UserConttroler';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json({ ok: 'Connected' });
});

router.get('/users', UserConttroler.getAll);

export default router;
