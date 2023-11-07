import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

import { CurrentUser } from '@/infra/auth/currrent-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/upload')
export class UploadFileController {
  //   constructor(private createFile: CreateFileUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @CurrentUser() user: UserPayload,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 100 }), // 100mb
          new FileTypeValidator({
            fileType: '.(mpeg|mp3|mp4|wav)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file, user)
  }
}
