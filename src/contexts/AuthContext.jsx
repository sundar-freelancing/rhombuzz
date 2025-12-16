import { useEffect, useState } from "react";
import { onAuthChange } from "@/lib/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="flex min-h-svh items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
