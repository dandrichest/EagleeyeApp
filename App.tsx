import React, { useState, createContext, useContext, useMemo, useCallback, useReducer } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { User, UserRole, CartableItem, CartItem } from './types';
import { USERS as INITIAL_USERS } from './constants';
import { Layout } from './components/Layout';
import HomePage from './components/HomePage';
import StorePage from './components/StorePage';
import TrainingPage from './components/TrainingPage';
import BlogPage from './components/BlogPage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import DashboardPage from './components/DashboardPage';
import CheckoutPage, { OrderConfirmationPage } from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password?: string) => Promise<User>;
  logout: () => void;
  register: (name: string, email: string, password?: string) => Promise<User>;
  updateUserRole: (userId: string, role: UserRole) => void;
  updateUserProfile: (userId: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const login = useCallback(async (email: string, password?: string) => {
    return new Promise<User>((resolve, reject) => {
        setTimeout(() => {
            const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (foundUser && foundUser.password === password) {
                setUser(foundUser);
                resolve(foundUser);
            } else if (foundUser) {
                reject(new Error('Invalid password.'));
            }
            else {
                reject(new Error('User not found.'));
            }
        }, 500);
    });
  }, [users]);

  const register = useCallback(async (name: string, email: string, password?: string) => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
          reject(new Error('Email already in use.'));
          return;
        }
        const newUser: User = {
          id: `user_${Date.now()}`,
          name,
          email,
          role: UserRole.CUSTOMER,
          password,
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        setUser(newUser);
        resolve(newUser);
      }, 500);
    });
  }, [users]);


  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUserRole = useCallback((userId: string, role: UserRole) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, role } : u));
  }, []);

  const updateUserProfile = useCallback((userId: string, name: string) => {
    const updateUser = (prev: User[] | null) => {
      if (!prev) return [];
      return prev.map(u => (u.id === userId ? { ...u, name } : u));
    };
    setUsers(updateUser);
    setUser(prev => (prev && prev.id === userId ? { ...prev, name } : prev));
  }, []);


  const value = useMemo(() => ({ user, users, login, logout, register, updateUserRole, updateUserProfile }), [user, users, login, logout, register, updateUserRole, updateUserProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// --- CART CONTEXT ---
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartableItem, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

type CartAction =
    | { type: 'ADD_ITEM'; payload: { item: CartableItem, quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.find(i => i.item.id === action.payload.item.id);
            if (existingItem) {
                return state.map(i => i.item.id === action.payload.item.id ? { ...i, quantity: i.quantity + action.payload.quantity } : i);
            }
            return [...state, { item: action.payload.item, quantity: action.payload.quantity }];
        }
        case 'REMOVE_ITEM':
            return state.filter(i => i.item.id !== action.payload);
        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                 return state.filter(i => i.item.id !== action.payload.id);
            }
            return state.map(i => i.item.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
        }
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addToCart = useCallback((item: CartableItem, quantity: number = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
    }, []);

    const removeFromCart = useCallback((itemId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    }, []);

    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0), [cart]);

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
    }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


// --- PROTECTED ROUTES ---
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || user.role !== UserRole.ADMIN) {
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};


// --- APP COMPONENT ---
function App() {
  return (
    <AuthProvider>
        <CartProvider>
            <HashRouter>
                <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin-login" element={<AdminLoginPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/profile" element={
                        <UserProtectedRoute>
                            <ProfilePage />
                        </UserProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                        <AdminProtectedRoute>
                            <DashboardPage />
                        </AdminProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                </Layout>
            </HashRouter>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;