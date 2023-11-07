import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserRepository } from '@/domain/project/application/repositories/user-repository'
import { User } from '@/domain/project/enterprise/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return PrismaUserMapper.toDomain(student)
  }

  async create(student: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}
