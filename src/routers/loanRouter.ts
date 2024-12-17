import { Router } from 'express';
import { LoanController } from '../controllers/LoanController';
import  verifyUser  from '../middleware/verifyUser';
import  verifyAdmin from '../middleware/verifyAdmin';

const router = Router();

router.get('/', verifyUser, LoanController.getAll);
router.post('/apply', verifyUser, LoanController.apply);
router.post('/:id/repay', verifyUser, LoanController.repay);
router.get('/all', verifyUser, verifyAdmin, LoanController.getAllLoansForAllUsers);
router.post('/:id/approve', verifyUser, verifyAdmin, LoanController.approve);

export default router;
