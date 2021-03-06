import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/UserService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { UserValidator } from '../validators/UserValidator';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password }: IUser = request.body;

    const userValidator = new UserValidator();
    try {
      await userValidator.createValidation().validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(200, error.message || error);
    }
    if (await userValidator.emailExist(email)) throw new ApiError(200, 'User already exists');

    const userService = new UserService();
    const user = await userService.create({ name, email, password });
    return response.status(201).json(user);
  }

  async read(request: Request, response: Response) {
    const userService = new UserService();
    const user = await userService.read();
    return response.status(200).json(user);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const userValidator = new UserValidator();
    try {
      await userValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 200 : 200, error.message || error);
    }
    if (!(await userValidator.idExist(+id))) throw new ApiError(200, 'User does not exist');

    const userService = new UserService();
    const user = await userService.readById(+id);
    return response.status(200).json(user);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const userValidator = new UserValidator();
    try {
      await userValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 200 : 200, error.message || error);
    }
    if (!(await userValidator.idExist(+id))) throw new ApiError(200, 'User does not exist');

    const userService = new UserService();
    await userService.deleteById(+id);
    return response.status(200).json({ message: 'User deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IUser = request.body;

    const userValidator = new UserValidator();
    try {
      await userValidator.updateValidation().validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 200 : 200, error.message || error);
    }
    if (!(await userValidator.idExist(+id))) throw new ApiError(200, 'User does not exist');

    const userService = new UserService();
    await userService.updateById(+id, data);
    return response.status(200).json({ message: 'User updated successfully' });
  }
}

export { UserController };
