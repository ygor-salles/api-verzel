import { Request, Response } from 'express';
import { IModule } from '../interfaces/IModule';
import { ModuleService } from '../services/ModuleService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { ModuleValidator } from '../validators/ModuleValidator';

class ModuleController {
  async create(request: Request, response: Response) {
    const { name }: IModule = request.body;

    const moduleValidator = new ModuleValidator();
    try {
      await moduleValidator.createValidation().validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }
    if (await moduleValidator.nameExist(name)) throw new ApiError(400, 'Module already exists');

    const moduleService = new ModuleService();
    const module = await moduleService.create({ name });
    return response.status(201).json(module);
  }

  async read(request: Request, response: Response) {
    const moduleService = new ModuleService();
    const module = await moduleService.read();
    return response.status(200).json(module);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const moduleValidator = new ModuleValidator();
    try {
      await moduleValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await moduleValidator.idExist(+id))) throw new ApiError(400, 'Module does not exist');

    const moduleService = new ModuleService();
    const module = await moduleService.readById(+id);
    return response.status(200).json(module);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const moduleValidator = new ModuleValidator();
    try {
      await moduleValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await moduleValidator.idExist(+id))) throw new ApiError(400, 'Module does not exist');

    const moduleService = new ModuleService();
    await moduleService.deleteById(+id);
    return response.status(200).json({ message: 'Module deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: IModule = request.body;

    const moduleValidator = new ModuleValidator();
    try {
      await moduleValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await moduleValidator.idExist(+id))) throw new ApiError(400, 'Module does not exist');

    const moduleService = new ModuleService();
    await moduleService.updateById(+id, data);
    return response.status(200).json({ message: 'Module updated successfully' });
  }
}

export { ModuleController };
