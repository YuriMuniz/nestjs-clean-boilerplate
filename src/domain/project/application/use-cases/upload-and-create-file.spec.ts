import { InMemoryFileRepository } from 'test/repositories/in-memory-files-repository'
import { UploadAndCreateFileUseCase } from './upload-and-create-file'
import { FakeUploader } from 'test/storage/fake-uploader'
import exp from 'constants'
import { InvalidFileTypeError } from './errors/invalid-file'

let inMemoryFilesRepository: InMemoryFileRepository

let sut: UploadAndCreateFileUseCase
let fakeUploader: FakeUploader

describe('Crete and upload file', () => {
  beforeEach(() => {
    inMemoryFilesRepository = new InMemoryFileRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateFileUseCase(inMemoryFilesRepository, fakeUploader)
  })

  it('should be able to upload and create a new file', async () => {
    const result = await sut.execute({
      fileName: 'audio.mp3',
      type: 'audio/mpeg',
      size: 12,
      body: Buffer.from(''),
      userId: '12',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      file: inMemoryFilesRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'audio.mp3',
      }),
    )
  })

  it('should be able to upload file with invalid type', async () => {
    const result = await sut.execute({
      fileName: 'image.jpeg',
      type: 'image/jpeg',
      size: 12,
      body: Buffer.from(''),
      userId: '12',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidFileTypeError)
  })
})
