import { Optional } from '@/_types/optional'
import { Entity } from '@/core/entities/entity'

export enum PaymentStatus {
  PAYED = 'PAYED',
  PENDING = 'PENDING',
  NOT_PAYED = 'NOT_PAYED',
}

export enum PaymentMethod {
  PIX = 'PIX',
}

export enum PaymentFrequency {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export type Ipayment = {
  id: string
  psychologistId: string
  subscriptionPlanId: string
  amount: number
  paidAt?: Date | null
  expiresAt?: Date
  externalId?: string
  createdAt: Date
  status: PaymentStatus
  paymentMethod: PaymentMethod
  paymentFrequency: PaymentFrequency
}

export class Payment extends Entity<Ipayment> {
  get id() {
    return this.props.id
  }

  get psychologistId() {
    return this.props.psychologistId
  }

  get subscriptionPlanId() {
    return this.props.subscriptionPlanId
  }

  get amount() {
    return this.props.amount
  }

  get paidAt() {
    return this.props.paidAt
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get externalId() {
    return this.props.externalId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get status() {
    return this.props.status
  }

  get paymentMethod() {
    return this.props.paymentMethod
  }

  get paymentFrequency() {
    return this.props.paymentFrequency
  }

  static create(props: Optional<Ipayment, 'createdAt'>) {
    const payment = new Payment({
      ...props,
      paidAt: props.paidAt || null,
      status: props.status || PaymentStatus.NOT_PAYED,
      createdAt: props.createdAt || new Date(),
    })

    return payment
  }
}
