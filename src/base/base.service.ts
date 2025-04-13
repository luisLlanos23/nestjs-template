import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeleteResult, UpdateResult, DeepPartial } from 'typeorm';
import { BaseRepo } from 'src/base/base.repository';
import { Base as BaseEntity } from 'src/base/base.entity';

@Injectable()
export abstract class BaseService<ENTITY extends BaseEntity, CREATE_DTO, UPDATE_DTO> {
  public abstract repository: BaseRepo<ENTITY>;

  async findAll(): Promise<ENTITY[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<ENTITY> {
    return this.repository.findOneOrFail({ where: { id } as any });
  }

  async create(createDto: CREATE_DTO) {
    return await this.repository.save(createDto as unknown as DeepPartial<ENTITY>);
  }

  async update(id: number, updateDto: UPDATE_DTO): Promise<UpdateResult> {
    return await this.repository.update(id, updateDto as unknown as QueryDeepPartialEntity<ENTITY>);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }
}