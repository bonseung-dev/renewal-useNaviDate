import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto, CreateTagsDto, UpdateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      const tag = this.tagRepository.create(createTagDto);
      return await this.tagRepository.save(tag);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('태그명이 이미 존재합니다.');
      }
      throw error;
    }
  }

  async createMultiple(createTagsDto: CreateTagsDto): Promise<Tag[]> {
    const { names } = createTagsDto;
    
    // 기존 태그들 조회
    const existingTags = await this.tagRepository.find({
      where: { name: In(names) }
    });
    
    const existingNames = existingTags.map(tag => tag.name);
    const newNames = names.filter(name => !existingNames.includes(name));
    
    // 새 태그들 생성
    const newTags = newNames.map(name => this.tagRepository.create({ name }));
    const savedNewTags = await this.tagRepository.save(newTags);
    
    return [...existingTags, ...savedNewTags];
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({
      where: { isDeleted: false },
      order: { name: 'ASC' }
    });
  }

  async findById(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id, isDeleted: false }
    });
    
    if (!tag) {
      throw new NotFoundException('태그를 찾을 수 없습니다.');
    }
    
    return tag;
  }

  async findByName(name: string): Promise<Tag | null> {
    return await this.tagRepository.findOne({
      where: { name, isDeleted: false }
    });
  }

  async findByNames(names: string[]): Promise<Tag[]> {
    return await this.tagRepository.find({
      where: { name: In(names), isDeleted: false }
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findById(id);
    
    if (updateTagDto.name && updateTagDto.name !== tag.name) {
      const existingTag = await this.findByName(updateTagDto.name);
      if (existingTag) {
        throw new ConflictException('태그명이 이미 존재합니다.');
      }
    }
    
    Object.assign(tag, updateTagDto);
    return await this.tagRepository.save(tag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findById(id);
    tag.isDeleted = true;
    await this.tagRepository.save(tag);
  }

  async getPopularTags(limit: number = 10): Promise<Tag[]> {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.posts', 'post')
      .where('tag.isDeleted = :isDeleted', { isDeleted: false })
      .addSelect('COUNT(post.id)', 'postCount')
      .groupBy('tag.id')
      .orderBy('postCount', 'DESC')
      .addOrderBy('tag.name', 'ASC')
      .limit(limit)
      .getMany();
  }
}
