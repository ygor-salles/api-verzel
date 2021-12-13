import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { LessonsRepository } from '../repositories/LessonRepository';

class LessonValidator {
  async idExist(id: number): Promise<Boolean> {
    const repository = getCustomRepository(LessonsRepository);
    const lesson = await repository.findOne(id);
    return !!lesson;
  }

  createValidation() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      date_lesson: yup.date().required('Date lesson is required'),
      module_id: yup.number().required('Referring module id is required'),
      link: yup.string().optional(),
      description: yup.string().optional(),
    });
  }

  updateValidation() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      date_lesson: yup.date().optional(),
      module_id: yup.number().optional(),
      link: yup.string().optional(),
      description: yup.string().optional(),
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

export { LessonValidator };
