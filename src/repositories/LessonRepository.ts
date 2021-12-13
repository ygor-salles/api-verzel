import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from '../models/Lesson';

@EntityRepository(Lesson)
class LessonsRepository extends Repository<Lesson> {}

export { LessonsRepository };
