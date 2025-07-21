import { Injectable } from '@nestjs/common'

import { PaymentRepository } from '@/core/domain/main/application/repositories/payment-repository'
import { Payment } from '@/core/domain/main/enterprise/entities/payment'

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor() {}

  async create(payment: Payment) {}

  async save(payment: Payment) {}

  async findMany() {}

  async delete(id: string) {}
}