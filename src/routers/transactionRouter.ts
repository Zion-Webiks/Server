import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { verifyUser } from '../middleware/verifyUser';
import { verifyAdmin } from '../middleware/verifyAdmin';

const router = Router();

router.get('/', verifyUser, TransactionController.getAll);
router.post('/deposit', verifyUser, TransactionController.deposit);
router.post('/withdraw', verifyUser, TransactionController.withdraw);
router.get('/all', verifyUser, verifyAdmin, TransactionController.getAllTransactionsForAllUsers);

export default router;
