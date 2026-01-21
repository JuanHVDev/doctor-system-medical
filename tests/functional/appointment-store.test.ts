import { describe, it, expect, beforeEach } from 'vitest'
import { useAppointmentStore } from '@/store/appointment-store'

describe('appointment-store', () =>
{
  beforeEach(() =>
  {
    useAppointmentStore.setState({ appointments: [], selectedAppointment: null, isLoading: false, filters: {} })
  })

  it('addAppointment should add a new appointment', () =>
  {
    const mockAppointment = { id: '1', patientId: 'p1', doctorId: 'd1', startTime: new Date(), endTime: new Date(), duration: 30, status: 'SCHEDULED' as const, appointmentType: 'ROUTINE_CHECKUP' as const }

    useAppointmentStore.getState().addAppointment(mockAppointment)

    expect(useAppointmentStore.getState().appointments).toHaveLength(1)
    expect(useAppointmentStore.getState().appointments[0]).toEqual(mockAppointment)
  })

  it('updateAppointment should update existing appointment', () =>
  {
    const mockAppointment = { id: '1', status: 'SCHEDULED' as const } as any
    useAppointmentStore.setState({ appointments: [mockAppointment] })

    useAppointmentStore.getState().updateAppointment('1', { status: 'COMPLETED' })

    expect(useAppointmentStore.getState().appointments[0].status).toBe('COMPLETED')
  })

  it('deleteAppointment should remove appointment', () =>
  {
    useAppointmentStore.setState({ appointments: [{ id: '1' } as any] })

    useAppointmentStore.getState().deleteAppointment('1')

    expect(useAppointmentStore.getState().appointments).toHaveLength(0)
  })

  it('setSelectedAppointment should update selected appointment', () =>
  {
    const mockAppointment = { id: '1' } as any
    useAppointmentStore.getState().setSelectedAppointment(mockAppointment)

    expect(useAppointmentStore.getState().selectedAppointment).toEqual(mockAppointment)
  })
})
