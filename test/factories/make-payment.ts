import { randomUUID } from 'node:crypto'
import {
  Payment,
  Ipayment,
  PaymentStatus,
  PaymentMethod,
  PaymentFrequency,
} from '@/core/domain/main/enterprise/entities/payment'

export const makePayment = async (override: Partial<Ipayment> = {}) => {
  const payment = Payment.create({
    id: randomUUID(),
    psychologistId: randomUUID(),
    subscriptionPlanId: randomUUID(),
    amount: 1,
    paidAt: null,
    expiresAt: new Date(),
    externalId: randomUUID(),
    createdAt: new Date(),
    status: PaymentStatus.NOT_PAYED,
    paymentMethod: PaymentMethod.PIX,
    paymentFrequency: PaymentFrequency.MONTHLY,
    ...override,
  })

  return payment
}
