import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const useController = new UserController();
router.get('/search-all', useController.searchAll);
router.get('/search/:id', useController.searchUser);
router.post('/save', useController.saveUser);
router.put('/update/:id', useController.UpdateUser);
router.delete('/delete/:id', useController.deleteUser);

export default router;
