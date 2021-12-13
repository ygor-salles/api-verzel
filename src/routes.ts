import { Request, Response, Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { ModuleController } from './controllers/ModuleController';
import { UserController } from './controllers/UserController';
import { Auth } from './middlewares/Auth';

const router = Router();

const authController = new AuthController();
const userController = new UserController();
const moduleController = new ModuleController();

router.get('/', (req: Request, resp: Response) =>
  resp.status(200).json({ message: 'Hellow, api-verzel' }),
);

router.post('/users', userController.create);
router.get('/users', Auth, userController.read);
router.get('/users/:id', Auth, userController.readById);
router.put('/users/:id', Auth, userController.updateById);
router.delete('/users/:id', Auth, userController.deleteById);

router.post('/modules', Auth, moduleController.create);
router.get('/modules', Auth, moduleController.read);
router.get('/modules/:id', Auth, moduleController.readById);
router.put('/modules/:id', Auth, moduleController.updateById);
router.delete('/modules/:id', Auth, moduleController.deleteById);

router.post('/login', authController.handle);

export { router };
