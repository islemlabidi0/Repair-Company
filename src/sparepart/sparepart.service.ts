import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './sparepart.entity';
import { CreateSparePartDto } from './dto/create-sparepart.dto';
import { UpdateSparePartDto } from './dto/update-sparepart.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SparePartService {
  constructor(
    @InjectRepository(SparePart)
    private repo: Repository<SparePart>,
  ) {}

  async create(dto: CreateSparePartDto) {
  const exists = await this.repo.findOne({
    where: { name: dto.name },
  });

  if (exists) {
    throw new BadRequestException('Spare part already exists');
  }

  const part = this.repo.create(dto);
  return this.repo.save(part);
}


  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateSparePartDto) {
    const spare = await this.repo.findOneBy({ id });
    if (!spare) throw new NotFoundException('SparePart not found');
    Object.assign(spare, dto);
    return this.repo.save(spare);
  }

  async remove(id: number) {
    const spare = await this.repo.findOneBy({ id });
    if (!spare) throw new NotFoundException('SparePart not found');
    return this.repo.remove(spare);
  }
}
