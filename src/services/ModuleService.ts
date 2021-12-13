import { getCustomRepository, Repository } from 'typeorm';
import { IModule } from '../interfaces/IModule';
import { Module } from '../models/Module';
import { ModulesRepository } from '../repositories/ModuleRepository';

class ModuleService {
  private repositoryModule: Repository<Module>;

  constructor() {
    this.repositoryModule = getCustomRepository(ModulesRepository);
  }

  async create(data: IModule) {
    const module = this.repositoryModule.create(data);
    await this.repositoryModule.save(module);
    return module;
  }

  async read() {
    const allModules = await this.repositoryModule.find({ relations: ['lessons'] });
    return allModules;
  }

  async readById(id: number) {
    const module = await this.repositoryModule.findOne(id, { relations: ['lessons'] });
    return module;
  }

  async deleteById(id: number) {
    await this.repositoryModule.delete(id);
  }

  async updateById(id: number, data: IModule) {
    await this.repositoryModule.update(id, data);
  }
}

export { ModuleService };
