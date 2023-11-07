import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { File, FileProps } from '@/domain/project/enterprise/entities/file'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFileMapper } from '@/infra/database/prisma/mappers/prisma-file-mapper'

export function makeFile(
  override: Partial<FileProps> = {},
  id?: UniqueEntityID,
) {
  const file = File.create(
    {
      name: 'nome-teste-file',
      type: 'mp4',
      userId: new UniqueEntityID(),
      ...override,
      url: 's3.com/file.mp3',
      size: 12,
    },
    id,
  )

  return file
}

@Injectable()
export class FileFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaFile(data: Partial<FileProps> = {}): Promise<File> {
    const file = makeFile(data)

    await this.prisma.file.create({
      data: PrismaFileMapper.toPrisma(file),
    })

    return file
  }
}
