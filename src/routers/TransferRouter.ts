import { Router } from 'express';
import { TransferController } from '../controllers/TransferController';
import  verifyUser  from '../middleware/verifyUser';

const router = Router();

router.get('/', verifyUser, TransferController.getAll);
router.post('/', verifyUser, TransferController.create);

export default router;
