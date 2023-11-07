import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface FileProps {
  name: string
  type: string
  size: number
  url: string
  createdAt: Date
  userId: UniqueEntityID
}

export class File extends Entity<FileProps> {
  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get size() {
    return this.props.size
  }

  get createdAt() {
    return this.props.createdAt
  }

  get userId() {
    return this.props.userId
  }

  get url() {
    return this.props.url
  }

  static create(props: Optional<FileProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new File(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return user
  }
}
