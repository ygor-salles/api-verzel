import { getCustomRepository, Repository } from 'typeorm';
import { ILesson } from '../interfaces/ILesson';
import { Lesson } from '../models/Lesson';
import { LessonsRepository } from '../repositories/LessonRepository';

class LessonService {
  private repositoryLesson: Repository<Lesson>;

  constructor() {
    this.repositoryLesson = getCustomRepository(LessonsRepository);
  }

  async create(data: ILesson) {
    const lesson = this.repositoryLesson.create(data);
    await this.repositoryLesson.save(lesson);
    return lesson;
  }

  async read() {
    const allLessons = await this.repositoryLesson.find();
    return allLessons;
  }

  async readById(id: number) {
    const lesson = await this.repositoryLesson.findOne(id);
    return lesson;
  }

  async deleteById(id: number) {
    await this.repositoryLesson.delete(id);
  }

  async updateById(id: number, data: ILesson) {
    await this.repositoryLesson.update(id, data);
  }
}

export { LessonService };
