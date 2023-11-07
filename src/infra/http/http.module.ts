import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/auth/authenticate-controller'
import { CreateAccountController } from './controllers/users/user-create.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterUserUseCase } from '@/domain/project/application/use-cases/register-user'
import { AuthenticateUserUseCase } from '@/domain/project/application/use-cases/authenticate-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UploadFileController } from './controllers/files/upload-files.controller'
import { UploadAndCreateFileUseCase } from '@/domain/project/application/use-cases/upload-and-create-file'
import { StorageModule } from '../storage/storage.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    UploadFileController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    UploadAndCreateFileUseCase,
  ],
})
export class HttpModule {}
