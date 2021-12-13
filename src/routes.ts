import { Request, Response, Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { Auth } from './middlewares/Auth';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.get('/', (req: Request, resp: Response) =>
  resp.status(200).json({ message: 'Hellow, api-verzel' }),
);

router.post('/users', userController.create);
router.get('/users', userController.read);
router.get('/users/:id', Auth, userController.readById);
router.put('/users/:id', Auth, userController.updateById);
router.delete('/users/:id', Auth, userController.deleteById);

router.post('/login', authController.handle);

export { router };
