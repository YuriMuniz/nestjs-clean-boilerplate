import { DomainEvents } from '@/core/events/domain-events'
import { FileRepository } from '@/domain/project/application/repositories/file-repository'
import { File } from '@/domain/project/enterprise/entities/file'

export class InMemoryFileRepository implements FileRepository {
  public items: File[] = []

  async findByName(name: string) {
    const file = this.items.find((item) => item.name === name)

    if (!file) {
      return null
    }

    return file
  }

  async create(file: File) {
    this.items.push(file)

    DomainEvents.dispatchEventsForAggregate(file.id)
  }
}
