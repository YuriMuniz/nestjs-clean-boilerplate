import { File } from './../../enterprise/entities/file'

export abstract class FileRepository {
  abstract findByName(name: string): Promise<File | null>
  abstract create(file: File): Promise<void>
}
