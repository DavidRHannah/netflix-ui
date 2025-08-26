import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import { useNavigate } from "@tanstack/react-router";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  preferences: {
    language: string;
    theme: "dark" | "light";
    autoplay: boolean;
    maturityRating: "G" | "PG" | "PG-13" | "R" | "NC-17";
  };
  subscription: {
    plan: "basic" | "standard" | "premium";
    status: "active" | "cancelled" | "expired";
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AuthError {
  message: string;
  code: string;
  field?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
  isAuthenticated: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "netflix_token";
const REFRESH_TOKEN_KEY = "netflix_refresh_token";

const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) =>
    localStorage.setItem(REFRESH_TOKEN_KEY, token),
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },
};

const mockApi = {
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@test.com" && password === "password123") {
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        preferences: {
          language: "en",
          theme: "dark",
          autoplay: true,
          maturityRating: "R",
        },
        subscription: {
          plan: "premium",
          status: "active",
        },
      };

      const token = "mock.jwt.token." + Date.now();
      const refreshToken = "mock.refresh.token." + Date.now();

      return { user: mockUser, token, refreshToken };
    }

    throw new AuthError("Invalid credentials", "INVALID_CREDENTIALS");
  },

  signup: async (userData: SignupData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (userData.email === "existing@test.com") {
      throw new AuthError("Email already exists", "EMAIL_EXISTS", "email");
    }

    const mockUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      preferences: {
        language: "en",
        theme: "dark",
        autoplay: true,
        maturityRating: "PG-13",
      },
      subscription: {
        plan: "basic",
        status: "active",
      },
    };

    const token = "mock.jwt.token." + Date.now();
    const refreshToken = "mock.refresh.token." + Date.now();

    return { user: mockUser, token, refreshToken };
  },

  updateProfile: async (userId: string, updates: Partial<User>) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return { success: true, updates };
  },

  refreshToken: async (refreshToken: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!refreshToken || refreshToken.includes("expired")) {
      throw new AuthError("Refresh token expired", "TOKEN_EXPIRED");
    }

    return {
      token: "mock.jwt.token." + Date.now(),
      refreshToken: "mock.refresh.token." + Date.now(),
    };
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public field?: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  const clearError = () => setError(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenManager.getToken();
      const refreshToken = tokenManager.getRefreshToken();

      if (!token || !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        if (tokenManager.isTokenExpired(token)) {
          const { token: newToken, refreshToken: newRefreshToken } =
            await mockApi.refreshToken(refreshToken);
          tokenManager.setToken(newToken);
          tokenManager.setRefreshToken(newRefreshToken);
        }

        const mockUser: User = {
          id: "1",
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          preferences: {
            language: "en",
            theme: "dark",
            autoplay: true,
            maturityRating: "R",
          },
          subscription: {
            plan: "premium",
            status: "active",
          },
        };

        setUser(mockUser);
      } catch (err) {
        console.error("Auth initialization failed:", err);
        tokenManager.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { user, token, refreshToken } = await mockApi.login(
        email,
        password,
      );

      tokenManager.setToken(token);
      tokenManager.setRefreshToken(refreshToken);
      setUser(user);

      navigate({ to: "/dashboard" });
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err);
      } else {
        setError(
          new AuthError("Login failed. Please try again.", "LOGIN_FAILED"),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setLoading(true);
    setError(null);

    try {
      const { user, token, refreshToken } = await mockApi.signup(userData);

      tokenManager.setToken(token);
      tokenManager.setRefreshToken(refreshToken);
      setUser(user);

      navigate({ to: "/dashboard" });
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err);
      } else {
        setError(
          new AuthError("Signup failed. Please try again.", "SIGNUP_FAILED"),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenManager.clearTokens();
    setUser(null);
    setError(null);
    navigate({ to: "/" });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await mockApi.updateProfile(user.id, updates);
      setUser((prevUser) => (prevUser ? { ...prevUser, ...updates } : null));
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err);
      } else {
        setError(
          new AuthError(
            "Failed to update profile. Please try again.",
            "UPDATE_FAILED",
          ),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
