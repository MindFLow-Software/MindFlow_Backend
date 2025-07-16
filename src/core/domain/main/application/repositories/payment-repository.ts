import { Payment } from '../../enterprise/entities/payment'

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<void>
  abstract save(payment: Payment): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findMany(): Promise<Payment[]>
}
