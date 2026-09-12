import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import keycloak from '../config/keycloak';

interface AuthState {
  isAuthenticated: boolean;
  username: string | undefined;
  roles: string[];
  hasRole: (role: string) => boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: keycloak.authenticated ?? false,
    username: keycloak.tokenParsed?.preferred_username,
    roles: keycloak.tokenParsed?.realm_access?.roles ?? [],
    hasRole: (role: string) => keycloak.tokenParsed?.realm_access?.roles?.includes(role) ?? false,
  });

  useEffect(() => {
    function updateAuthState(): void {
      const roles = keycloak.tokenParsed?.realm_access?.roles ?? [];

      setAuth({
        isAuthenticated: keycloak.authenticated ?? false,
        username: keycloak.tokenParsed?.preferred_username,
        roles,
        hasRole: (role: string) => roles.includes(role),
      });
    }

    keycloak.onAuthSuccess = updateAuthState;
    keycloak.onAuthLogout = updateAuthState;
    keycloak.onTokenExpired = updateAuthState;

    return () => {
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthLogout = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, []);

  function login(): void {
    void keycloak.login();
  }

  function logout(): void {
    void keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
