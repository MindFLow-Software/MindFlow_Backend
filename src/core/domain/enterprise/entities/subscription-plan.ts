import { Optional } from '@/_types/optional'
import { Entity } from '@/core/entities/entity'
import { randomUUID } from 'node:crypto'

export enum PlanInterval {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export type IsubscriptionPlan = {
  id: string
  name: string
  description: string[]
  priceInCents: number
  interval: PlanInterval
  createdAt: Date
  updatedAt: Date
}

export class SubscriptionPlan extends Entity<IsubscriptionPlan> {
  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  get interval() {
    return this.props.interval
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<IsubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const plan = new SubscriptionPlan({
      ...props,
      id: props.id || randomUUID(),
      interval: props.interval || PlanInterval.MONTHLY,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    })

    return plan
  }
}
