import { NotFoundException } from '@nestjs/common';
import {
    DeepPartial,
  DeleteResult,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Entity } from '../common-module/interfaces/interfaces';
import { SearchDto } from '../common-module/dto/search.dto';
import { Pagination } from '../common-module/dto/pagination.dto';

export abstract class GenericCrudService<TEntity extends Entity> {
  constructor(protected readonly repository: Repository<TEntity>) {}

 
  async create(createDto: Partial<TEntity>): Promise<TEntity> {
    const entity = this.repository.create(createDto as DeepPartial<TEntity>);
    return await this.repository.save(entity);
  }

  
  async findAll(
    searchDto?: SearchDto,
    where?: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
  ): Promise<Pagination<TEntity>> {
    const { take = 10, skip = 0 } = searchDto || {};

    const [data, count] = await this.repository.findAndCount({
      where,
      take,
      skip,
    });

    return {
      data,
      count,
    };
  }


  async findOne(
    id: string,
    relations?: FindOptionsRelations<TEntity>,
  ): Promise<TEntity> {
    const entity = await this.repository.findOne({
      relations,
      where: { id: id as any },
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return entity;
  }


  async update(
    id: string,
    updateDto: Partial<TEntity>,
  ): Promise<TEntity> {
    const entity = await this.repository.preload({ id, ...updateDto } as DeepPartial<TEntity>);

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return this.repository.save(entity);
  }


  async remove(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return result;
  }
}
