
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    // For demo purposes, we're using a mock authentication
    // In a real app, this would call an API endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists in localStorage (simulating a database)
        const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
        const storedUser = storedUsers[username];
        
        if (storedUser && storedUser.password === password) {
          const userData = { username };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error("Invalid username or password"));
        }
      }, 1000);
    });
  };

  const register = async (username: string, password: string): Promise<void> => {
    // For demo purposes, we're storing users in localStorage
    // In a real app, this would call an API endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
        
        // Check if username already exists
        if (storedUsers[username]) {
          reject(new Error("Username already exists"));
          return;
        }
        
        // Store new user
        storedUsers[username] = { password };
        localStorage.setItem("users", JSON.stringify(storedUsers));
        
        // Auto-login after registration
        const userData = { username };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
