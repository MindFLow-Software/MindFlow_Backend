import { FetchAppointmentsUseCase } from './fetch-appointments'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { makeAppointment } from 'test/factories/make-appointment'
import { AppointmentStatus } from '@/core/domain/enterprise/entities/appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FetchAppointmentsUseCase

describe('[GET]:Appointments', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchAppointmentsUseCase(inMemoryAppointmentRepository)
  })

  it('should be able to fetch paginated appointments', async () => {
    const PAGE_INDEX = 1
    const PER_PAGE = 10

    for (let i = 1; i <= 12; i++) {
      await inMemoryAppointmentRepository.create(
        await makeAppointment({
          patientId: `patient-id-${i}`,
          psychologistId: `psychologist-id-${i}`,
          diagnosis: `diagnosis-${i}`,
          notes: `notes-${i + 1}`,
          scheduledAt: new Date(),
          startedAt: new Date(),
          endedAt: new Date(new Date().getTime() + 60 * 60 * 1000),
          durationInMin: 60,
          status: AppointmentStatus.SCHEDULED,
          updatedAt: new Date(),
          id: `appointment-id-${i}`,
          createdAt: new Date(),
        }),
      )
    }

    const { appointments } = await sut.execute({
      pageIndex: PAGE_INDEX,
      perPage: PER_PAGE,
    })

    expect(appointments).toHaveLength(2)
    expect(appointments).toEqual([
      expect.objectContaining({
        id: 'appointment-id-11',
      }),
      expect.objectContaining({
        id: 'appointment-id-12',
      }),
    ])
  })
})
