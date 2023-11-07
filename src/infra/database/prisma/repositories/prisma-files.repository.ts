import { File } from './../../../../domain/project/enterprise/entities/file'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaFileMapper } from '../mappers/prisma-file-mapper'
import { FileRepository } from '@/domain/project/application/repositories/file-repository'

@Injectable()
export class PrismaFilesRepository implements FileRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<File | null> {
    const file = await this.prisma.file.findUnique({
      where: {
        name,
      },
    })

    if (!file) {
      return null
    }

    return PrismaFileMapper.toDomain(file)
  }

  async create(file: File): Promise<void> {
    const data = PrismaFileMapper.toPrisma(file)

    await this.prisma.file.create({
      data,
    })
  }
}
