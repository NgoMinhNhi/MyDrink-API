import {Router} from 'express';
import isUser from '../libs/JWT/isUser.auth';
import * as UserController from '../controlls/user.controller';
const router = new Router();

router.route('/registry')
  .post(UserController.createUser);
router.route('/:id')
  .delete( UserController.deleteUser)
  .get(UserController.getUser)
  .put(UserController.editUser);
router.route('/login')
  .post(UserController.login);
router.route('/get-all-user')
  .post(UserController.getAllUser);
export default router;
