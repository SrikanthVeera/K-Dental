import { Product, Order, User, DashboardStats } from '../types/admin';

export const dashboardStats: DashboardStats = {
  totalProducts: 248,
  totalOrders: 1543,
  totalUsers: 892,
  totalRevenue: 4567890
};

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Dental Ultrasonic Scaler",
    brand: "Woodpecker",
    category: "Equipment",
    price: 12999,
    mrp: 15999,
    stock: 45,
    description: "Professional ultrasonic scaler with LED light",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "LED Curing Light",
    brand: "3M ESPE",
    category: "Equipment",
    price: 8499,
    mrp: 10999,
    stock: 32,
    description: "High-intensity LED curing light",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Dental Composite Kit",
    brand: "Dentsply",
    category: "Materials",
    price: 3299,
    mrp: 3299,
    stock: 120,
    description: "Complete composite restoration kit",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400",
    createdAt: "2024-02-01"
  },
  {
    id: 4,
    name: "Surgical Extraction Kit",
    brand: "Hu-Friedy",
    category: "Instruments",
    price: 5999,
    mrp: 7499,
    stock: 28,
    description: "Premium surgical extraction instruments",
    image: "https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400",
    createdAt: "2024-02-10"
  },
  {
    id: 5,
    name: "Dental Loupes 3.5x",
    brand: "Orascoptic",
    category: "Equipment",
    price: 24999,
    mrp: 29999,
    stock: 8,
    description: "Professional dental loupes with LED light",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    createdAt: "2024-02-15"
  }
];

export const dummyOrders: Order[] = [
  {
    id: 1,
    orderId: "ORD-2024-001",
    customerName: "Dr. Rajesh Kumar",
    email: "rajesh@example.com",
    total: 45999,
    status: "delivered",
    date: "2024-03-01",
    items: 3
  },
  {
    id: 2,
    orderId: "ORD-2024-002",
    customerName: "Dr. Priya Sharma",
    email: "priya@example.com",
    total: 12999,
    status: "shipped",
    date: "2024-03-05",
    items: 1
  },
  {
    id: 3,
    orderId: "ORD-2024-003",
    customerName: "Dr. Amit Patel",
    email: "amit@example.com",
    total: 28500,
    status: "pending",
    date: "2024-03-08",
    items: 2
  },
  {
    id: 4,
    orderId: "ORD-2024-004",
    customerName: "Dr. Sneha Reddy",
    email: "sneha@example.com",
    total: 8499,
    status: "delivered",
    date: "2024-03-10",
    items: 1
  },
  {
    id: 5,
    orderId: "ORD-2024-005",
    customerName: "Dr. Vikram Singh",
    email: "vikram@example.com",
    total: 15999,
    status: "pending",
    date: "2024-03-12",
    items: 2
  }
];

export const dummyUsers: User[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh@example.com",
    role: "user",
    joinedDate: "2023-06-15",
    orders: 12
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    email: "priya@example.com",
    role: "admin",
    joinedDate: "2023-08-20",
    orders: 8
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    email: "amit@example.com",
    role: "user",
    joinedDate: "2023-09-10",
    orders: 15
  },
  {
    id: 4,
    name: "Dr. Sneha Reddy",
    email: "sneha@example.com",
    role: "user",
    joinedDate: "2023-11-05",
    orders: 6
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    email: "vikram@example.com",
    role: "user",
    joinedDate: "2024-01-12",
    orders: 4
  }
];
