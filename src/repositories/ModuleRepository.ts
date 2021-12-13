import { EntityRepository, Repository } from 'typeorm';
import { Module } from '../models/Module';

@EntityRepository(Module)
class ModulesRepository extends Repository<Module> {}

export { ModulesRepository };
