export type ID = string

export type Brand = {
  id: ID
  name: string
  logo: string
}

export type Product = {
  id: ID
  name: string
  slug: string
  brand: Brand
  price: number
  mrp?: number
  rating: number
  reviews: number
  image: string
  tags?: string[]
  stock: number
}

export type Doctor = {
  id: ID
  name: string
  slug: string
  specialty: string
  experience: number
  rating: number
  reviews: number
  avatar: string
  bio?: string
}

export type Appointment = {
  id: ID
  doctorId: ID
  userId: ID
  date: string // ISO date
  time: string // HH:mm
  status: 'scheduled' | 'completed' | 'cancelled'
}

export type CartItem = {
  product: Product
  qty: number
}

export type User = {
  id: ID
  name: string
  email: string
  avatar?: string
  wishlist: ID[] // product ids
}
