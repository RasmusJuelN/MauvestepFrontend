
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserDto, LoginResponseDto } from "@/lib/types";
import { AuthService } from "@/lib/services/authService";


interface AuthContextType {
  user: UserDto | null; // Current authenticated user
  token: string | null;
  isLoading: boolean; 
  login: (username: string, password: string, rememberMe: boolean) => Promise<UserDto>; 
  logout: () => void;
  updateUser: (updatedUser: UserDto) => void; // Update user data in auth context
}

// Create a context to provide authentication state to entire app
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps the app to provide authentication context
// This makes auth state accessible to all child components via useAuth hook
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);   
  const [token, setToken] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(true);  // Start as true to indicate in progress

  // Restore authentication state from localStorage and sessionStorage
  useEffect(() => {
    // Check localStorage first (for "Remember Me" sessions)
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    } else {
      // Check sessionStorage for non-remembered sessions (cleared on window close)
      const sessionToken = sessionStorage.getItem("token");
      const sessionUser = sessionStorage.getItem("user");
      
      if (sessionToken && sessionUser) {
        setToken(sessionToken);
        setUser(JSON.parse(sessionUser));
      }
    }
    
    setIsLoading(false);
  }, []);

  // Authenticates user with username and password
  const login = async (username: string, password: string, rememberMe: boolean): Promise<UserDto> => {
    setIsLoading(true);
    try {
      // Send login credentials to backend and get response with tokens
      const response: LoginResponseDto = await AuthService.login(username, password);

      if (rememberMe) {
        // "Remember Me": store tokens in localStorage for persistence with refresh capability
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        
        // Clear session storage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
      } else {
        // No "Remember Me": store only access token in session, user will be logged out when access token expires
        sessionStorage.setItem("token", response.accessToken);
        sessionStorage.setItem("user", JSON.stringify(response.user));
        
        // Clear localStorage and don't store refresh token
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }

      setToken(response.accessToken);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false); 
    }
  };

  // Clears all authentication data on logout
  const logout = () => {
    // Remove all auth-related items from both storages
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("refreshToken");
    
    // Clear auth
    setToken(null);
    setUser(null);
  };

  // Updates user in auth context and storage
  const updateUser = (updatedUser: UserDto) => {
    setUser(updatedUser);
    // Update in localStorage if user was remembered
    if (localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    // Update in sessionStorage if user is in session
    if (sessionStorage.getItem("user")) {
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Provide auth context to all child components
  // Any component can call useAuth() hook to access this data
  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook: access to auth context from any component
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  
  return context;
}
