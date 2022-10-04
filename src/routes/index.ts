import { Router } from 'express';

const router: Router = Router();
router.use('/post', require('./post'));

export default router;
