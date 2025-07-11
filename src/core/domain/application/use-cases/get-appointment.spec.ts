import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { GetAppointmentByIdUseCase } from './get-appointment'
import { makeAppointment } from 'test/factories/make-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: GetAppointmentByIdUseCase

describe('[GET]:APPOINTMENT:ID', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new GetAppointmentByIdUseCase(inMemoryAppointmentRepository)
  })

  it('should be able to get an appointment by id', async () => {
    const appointmentId = '12345'

    await inMemoryAppointmentRepository.create(
      await makeAppointment({
        id: appointmentId,
      }),
    )

    const { appointment } = await sut.execute({ id: appointmentId })

    expect(appointment).toEqual(
      expect.objectContaining({
        id: appointmentId,
      }),
    )
  })
})
