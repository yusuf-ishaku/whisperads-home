// hooks/useAuth.ts
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  profileComplete?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);
  
 const checkAuthStatus = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");
      
      // ✅ Check if userData exists and is not "undefined" string
      if (accessToken && userData && userData !== "undefined") {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (parseError) {
          console.error("Error parsing user data:", parseError);
          // If parsing fails, clear the invalid data
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
        }
      } else {
        setUser(null);
        
        // Clean up any invalid data
        if (userData === "undefined") {
          localStorage.removeItem("user");
        }
        if (!accessToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (accessToken: string, userData: User) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log("User logged in:", userData);
  };

const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  return { user, isLoading, login, logout, checkAuthStatus };
}