import { AppointmentStatus } from '../../enterprise/entities/appointment'
import { CreateAppointmentUseCase } from './create-appointment'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'

let inMemoryAppoinmentRepository: InMemoryAppointmentRepository
let sut: CreateAppointmentUseCase

describe('[POST]:APPOINTMENT', () => {
  beforeEach(() => {
    inMemoryAppoinmentRepository = new InMemoryAppointmentRepository()
    sut = new CreateAppointmentUseCase(inMemoryAppoinmentRepository)
  })

  it('should be able to create an appointment', async () => {
    await sut.execute({
      patientId: 'patient-id',
      psychologistId: 'professional-id',
      diagnosis: 'diagnosis-example',
      notes: 'notes-example',
      scheduledAt: new Date(),
      startedAt: new Date(),
      endedAt: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
      durationInMin: 60,
      status: AppointmentStatus.SCHEDULED,
      updatedAt: new Date(),
      id: '',
      createdAt: new Date(),
    })

    expect(inMemoryAppoinmentRepository.appointments[0]).toEqual(
      expect.objectContaining({
        patientId: 'patient-id',
        psychologistId: 'professional-id',
        diagnosis: 'diagnosis-example',
        notes: 'notes-example',
        status: 'SCHEDULED',
      }),
    )
  })
})
