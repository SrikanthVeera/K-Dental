// Mock API layer - replace with real endpoints later
import type { Product, Doctor, Appointment } from '@/lib/types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const api = {
  async listProducts(): Promise<Product[]> {
    const { products } = await import('@/mock/data')
    await delay(200)
    return products
  },
  async listDoctors(): Promise<Doctor[]> {
    const { doctors } = await import('@/mock/data')
    await delay(200)
    return doctors
  },
  async getProduct(slug: string): Promise<Product | undefined> {
    const { products } = await import('@/mock/data')
    await delay(150)
    return products.find(p => p.slug === slug)
  },
  async getDoctor(slug: string): Promise<Doctor | undefined> {
    const { doctors } = await import('@/mock/data')
    await delay(150)
    return doctors.find(d => d.slug === slug)
  },
  async createAppointment(payload: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> {
    await delay(300)
    return { id: crypto.randomUUID(), status: 'scheduled', ...payload }
  }
}
