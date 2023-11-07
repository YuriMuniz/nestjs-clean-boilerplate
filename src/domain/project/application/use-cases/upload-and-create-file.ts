import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { File } from '../../enterprise/entities/file'
import { FileAlreadyExistsError } from './errors/file-already-exists-error'
import { FileRepository } from '../repositories/file-repository'
import { InvalidFileTypeError } from './errors/invalid-file'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Uploader } from '../storage/uploader'

interface UploadAndCreateFileUseCaseRequest {
  fileName: string
  type: string
  size: number
  body: Buffer
  userId: string
}

type UploadAndCreateFileUseCaseResponse = Either<
  FileAlreadyExistsError | InvalidFileTypeError,
  {
    file: File
  }
>

@Injectable()
export class UploadAndCreateFileUseCase {
  constructor(
    private fileRepository: FileRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    type,
    size,
    body,
    userId,
  }: UploadAndCreateFileUseCaseRequest): Promise<UploadAndCreateFileUseCaseResponse> {
    const mimePattern = /^audio\/(mpeg|mp4|wav)$/
    if (!mimePattern.test(type)) {
      return left(new InvalidFileTypeError(type))
    }

    const fileWithSameName = await this.fileRepository.findByName(fileName)

    if (fileWithSameName) {
      return left(new FileAlreadyExistsError(fileName))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType: type,
      body,
    })

    const file = File.create({
      name: fileName,
      size,
      type,

      userId: new UniqueEntityID(userId),
      url,
    })

    await this.fileRepository.create(file)

    return right({
      file,
    })
  }
}
