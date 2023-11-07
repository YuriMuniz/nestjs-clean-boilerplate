import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

import { UserRepository } from '@/domain/project/application/repositories/user-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { FileRepository } from '@/domain/project/application/repositories/file-repository'
import { PrismaFilesRepository } from './prisma/repositories/prisma-files.repository'

// import { CacheModule } from '../cache/cache.module'

@Module({
  // imports: [CacheModule],
  providers: [
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: FileRepository,
      useClass: PrismaFilesRepository,
    },
  ],
  exports: [PrismaService, UserRepository, FileRepository],
})
export class DatabaseModule {}
