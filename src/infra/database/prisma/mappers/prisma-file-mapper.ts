import { File as PrismaFile, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { File } from '@/domain/project/enterprise/entities/file'

export class PrismaFileMapper {
  static toDomain(raw: PrismaFile): File {
    return File.create(
      {
        name: raw.name,
        type: raw.type,
        createdAt: raw.createdAt,
        size: raw.size,
        userId: new UniqueEntityID(raw.userId),
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(file: File): Prisma.FileUncheckedCreateInput {
    return {
      id: file.id.toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      createdAt: file.createdAt,
      url: file.url,
      userId: file.userId.toString(),
    }
  }
}
