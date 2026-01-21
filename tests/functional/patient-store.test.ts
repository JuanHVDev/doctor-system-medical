import { describe, it, expect, beforeEach } from 'vitest'
import { usePatientStore } from '@/store/patient-store'

describe('patient-store', () =>
{
  beforeEach(() =>
  {
    usePatientStore.setState({ patients: [], selectedPatient: null, searchQuery: '', isLoading: false })
  })

  it('addPatient should add a new patient', () =>
  {
    const mockPatient = { id: '1', fullName: 'John Doe', userId: 'u1' }
    usePatientStore.getState().addPatient(mockPatient)

    expect(usePatientStore.getState().patients).toHaveLength(1)
    expect(usePatientStore.getState().patients[0].fullName).toBe('John Doe')
  })

  it('updatePatient should update patient info', () =>
  {
    usePatientStore.setState({ patients: [{ id: '1', fullName: 'John Doe', userId: 'u1' }] })

    usePatientStore.getState().updatePatient('1', { fullName: 'Jane Doe' })

    expect(usePatientStore.getState().patients[0].fullName).toBe('Jane Doe')
  })

  it('setSearchQuery should update query', () =>
  {
    usePatientStore.getState().setSearchQuery('search')
    expect(usePatientStore.getState().searchQuery).toBe('search')
  })
})
