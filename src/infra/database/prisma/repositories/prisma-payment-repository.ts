import { Injectable } from '@nestjs/common'

import { PaymentRepository } from '@/core/domain/main/application/repositories/payment-repository'
import { Payment, PaymentFrequency, PaymentMethod, PaymentStatus } from '@/core/domain/main/enterprise/entities/payment'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(payment: Payment) {
    await this.prisma.payment.create({
      data: payment
    })
  }

  async save(payment: Payment) {
    await this.prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: payment
    })
  }

  async findMany() {
    const payments = await this.prisma.payment.findMany()

    return payments.map((payment) => 
      Payment.create({
        ...payment,
        status: PaymentStatus[payment.status],
        paymentMethod: PaymentMethod[payment.paymentMethod],
        paymentFrequency: PaymentFrequency[payment.paymentFrequency],
      })
    )
  }

  async delete(id: string) {
    await this.prisma.payment.delete({
      where: {
        id,
      },
    })
  }
}