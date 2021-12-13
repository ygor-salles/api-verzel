import { Request, Response } from 'express';
import { ILesson } from '../interfaces/ILesson';
import { LessonService } from '../services/LessonService';
import { ApiError } from '../validators/Exceptions/ApiError';
import { LessonValidator } from '../validators/LessonValidator';

class LessonController {
  async create(request: Request, response: Response) {
    const { name, date_lesson, module_id, link, description }: ILesson = request.body;

    const lessonValidator = new LessonValidator();
    try {
      await lessonValidator.createValidation().validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message || error);
    }

    const lessonService = new LessonService();
    const lesson = await lessonService.create({ name, date_lesson, module_id, link, description });
    return response.status(201).json(lesson);
  }

  async read(request: Request, response: Response) {
    const lessonService = new LessonService();
    const lesson = await lessonService.read();
    return response.status(200).json(lesson);
  }

  async readById(request: Request, response: Response) {
    const { id } = request.params;

    const lessonValidator = new LessonValidator();
    try {
      await lessonValidator.readByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await lessonValidator.idExist(+id))) throw new ApiError(400, 'Lesson does not exist');

    const lessonService = new LessonService();
    const lesson = await lessonService.readById(+id);
    return response.status(200).json(lesson);
  }

  async deleteById(request: Request, response: Response) {
    const { id } = request.params;

    const lessonValidator = new LessonValidator();
    try {
      await lessonValidator.deleteByIdValidation().validate({ id: +id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await lessonValidator.idExist(+id))) throw new ApiError(400, 'Lesson does not exist');

    const lessonService = new LessonService();
    await lessonService.deleteById(+id);
    return response.status(200).json({ message: 'Lesson deleted successfully' });
  }

  async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { ...data }: ILesson = request.body;

    const lessonValidator = new LessonValidator();
    try {
      await lessonValidator
        .updateValidation()
        .validate({ id: +id, ...data }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(error.message ? 400 : 404, error.message || error);
    }
    if (!(await lessonValidator.idExist(+id))) throw new ApiError(400, 'Lesson does not exist');

    const lessonService = new LessonService();
    await lessonService.updateById(+id, data);
    return response.status(200).json({ message: 'Lesson updated successfully' });
  }
}

export { LessonController };
