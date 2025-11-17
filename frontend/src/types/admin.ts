export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  description: string;
  image: string;
  createdAt: string;
}

export interface Order {
  id: number;
  orderId: string;
  customerName: string;
  email: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinedDate: string;
  orders: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}
