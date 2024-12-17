import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../context/AuthContext';

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: () => Promise<void>;
        agent: {
          getPrincipal: () => Promise<{ toText: () => string }>;
        };
      };
    }
  }
}

// Custom hook to use AuthContext and Plug Identity
export const useAuth = (): AuthContextType & { identity: string | null } => {
  const authContext = useContext(AuthContext);
  const [identity, setIdentity] = useState<string | null>(null);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  useEffect(() => {
    if (window.ic && window.ic.plug) {
      window.ic.plug
        .requestConnect()
        .then(() => window.ic.plug!.agent.getPrincipal())
        .then((principal: { toText: () => string }) =>
          setIdentity(principal.toText())
        )
        .catch((err: Error) => console.error('Login failed', err));
    }
  }, []);

  return { ...authContext, identity };
};
