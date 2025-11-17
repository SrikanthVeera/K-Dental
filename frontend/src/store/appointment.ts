import { create } from 'zustand'
import type { Appointment } from '@/lib/types'

interface AppointmentState {
  appointments: Appointment[]
  add: (a: Appointment) => void
  cancel: (id: string) => void
}

export const useAppointments = create<AppointmentState>((set) => ({
  appointments: [],
  add: (a) => set(state => ({ appointments: [a, ...state.appointments] })),
  cancel: (id) => set(state => ({
    appointments: state.appointments.map(it => it.id === id ? { ...it, status: 'cancelled' } : it)
  }))
}))
