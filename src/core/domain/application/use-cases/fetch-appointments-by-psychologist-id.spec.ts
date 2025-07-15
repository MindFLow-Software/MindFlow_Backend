import { randomUUID } from 'node:crypto'

import { makeAppointment } from 'test/factories/make-appointment'
import { AppointmentStatus } from '@/core/domain/enterprise/entities/appointment'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { FetchAppointmentsByPsychologistIdUseCase } from './fetch-appointments-by-psychologist-id'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FetchAppointmentsByPsychologistIdUseCase

describe('[GET]:APPOINTMENTS:PSYCHOLOGIST-ID', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchAppointmentsByPsychologistIdUseCase(inMemoryAppointmentRepository)
  })

  it('should be able to fetch paginated appointments by psychologist', async () => {
    const PAGE_INDEX = 0
    const PER_PAGE = 10

    await inMemoryAppointmentRepository.create(
      await makeAppointment({
        patientId: randomUUID(),
        psychologistId: randomUUID(),
        scheduledAt: new Date(),
        startedAt: new Date(),
        endedAt: new Date(new Date().getTime() + 60 * 60 * 1000),
        durationInMin: 60,
        status: AppointmentStatus.SCHEDULED,
      })
    )

    const psychologistId = randomUUID()

    for (let i = 1; i <= 4; i++) {
      inMemoryAppointmentRepository.create(
        await makeAppointment({
           id: `appointment-id-${i}`,
           patientId: randomUUID(),
           psychologistId,
           scheduledAt: new Date(),
           startedAt: new Date(),
           endedAt: new Date(new Date().getTime() + 60 * 60 * 1000),
           durationInMin: 60,
           status: AppointmentStatus.SCHEDULED,
        }),
      )
    }

    const { appointments } = await sut.execute({
      pageIndex: PAGE_INDEX,
      perPage: PER_PAGE,
      psychologistId,
    })


    expect(appointments).toHaveLength(4)
    expect(appointments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          psychologistId,
        }),
        expect.objectContaining({
          psychologistId,
        }),
        expect.objectContaining({
          psychologistId,
        }),
      ])
    )
  })
})
