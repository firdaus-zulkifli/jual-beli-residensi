"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type UserProfile = {
  id: string;
  telegram_id: number;
  username: string;
  role: string;
};

type UserContextType = {
  profile: UserProfile | null;
  loading: boolean;
  access: "loading" | "granted" | "denied";
};

const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  access: "loading",
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState<"loading" | "granted" | "denied">("loading");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (!tg?.initData) {
      setAccess("denied");
      setLoading(false);
      return;
    }

    tg.ready();
    tg.expand();

    // 1. Verify initData with our backend (Telegram gating)
    // 2. If valid, upsert the user profile and get back the profile data
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setAccess("denied");
          return;
        }
        const data = await res.json();
        if (data.success && data.profile) {
          setProfile(data.profile);
          setAccess("granted");
        } else {
          setAccess("denied");
        }
      })
      .catch(() => {
        setAccess("denied");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ profile, loading, access }}>
      {children}
    </UserContext.Provider>
  );
}
