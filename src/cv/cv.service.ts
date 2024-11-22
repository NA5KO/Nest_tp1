import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GenericCrudService } from 'src/common-module/generic-crud';
import { Pagination } from 'src/common-module/dto/pagination.dto';
import { SearchDto } from 'src/common-module/dto/search.dto';

@Injectable()
export class CvService extends GenericCrudService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }


  async create(createCvDto: CreateCvDto): Promise<Cv> {
    return super.create(createCvDto);
  }

  async findOne(id: string): Promise<Cv> {
    return super.findOne(id);
  }

  async findAll(searchDto?: SearchDto, where?: FindOptionsWhere<Cv> | FindOptionsWhere<Cv>[]): Promise<Pagination<Cv>> {
    return super.findAll(searchDto, where);
  }

  async update(id: string, updateCvDto: UpdateCvDto): Promise<Cv> {
    return super.update(id, updateCvDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return super.remove(id);
  }
}
