import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { ModulesRepository } from '../repositories/ModuleRepository';

class ModuleValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(ModulesRepository);
    const module = await repository.findOne(id);
    return !!module;
  }

  async nameExist(name: string): Promise<Boolean> {
    const repository = getCustomRepository(ModulesRepository);
    const module = await repository.findOne({ name });
    return !!module;
  }

  createValidation() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
    });
  }
}

export { ModuleValidator };
