import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, otp?: string) => Promise<void>;
  logout: () => void;
}

// Mock users for demo
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@dentalkart.com',
    phone: '9876543210',
    role: 'admin' as const
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '9876543211',
    role: 'user' as const
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (phoneOrEmail: string, otpOrPassword?: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication logic
        let user: User | undefined;

        // Check if it's phone login (OTP)
        if (phoneOrEmail.length === 10 && /^\d+$/.test(phoneOrEmail)) {
          user = mockUsers.find((u) => u.phone === phoneOrEmail);
        } else {
          // Email login
          user = mockUsers.find((u) => u.email === phoneOrEmail);
        }

        if (user) {
          set({ user, isAuthenticated: true });
        } else {
          // Create new user for demo
          const newUser: User = {
            id: Date.now(),
            name: 'New User',
            email: phoneOrEmail.includes('@') ? phoneOrEmail : `user${phoneOrEmail}@example.com`,
            phone: phoneOrEmail.length === 10 ? phoneOrEmail : '0000000000',
            role: 'user'
          };
          set({ user: newUser, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
