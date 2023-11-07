import { DomainEvents } from '@/core/events/domain-events'
import { UserRepository } from '@/domain/project/application/repositories/user-repository'
import { User } from '@/domain/project/enterprise/entities/user'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)

    DomainEvents.dispatchEventsForAggregate(user.id)
  }
}
