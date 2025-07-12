import { PaymentRepository } from '@/core/domain/application/repositories/payment-repository'
import { Payment } from '@/core/domain/enterprise/entities/payment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryPaymentRepository implements PaymentRepository {
  public payments: Payment[] = []

  constructor() {}

  async create(payment: Payment): Promise<void> {
    this.payments.push(payment)
  }

  async save(payment: Payment): Promise<void> {
    const paymentToUpdateIndex = this.payments.findIndex(
      ({ id }) => id === payment.id,
    )

    this.payments[paymentToUpdateIndex] = payment
  }

  async delete(id: string): Promise<void> {
    this.payments = this.payments.filter((payment) => payment.id !== id)
  }

  async findMany(): Promise<Payment[]> {
    return this.payments
  }
}
