import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { MenuGroup } from "../types/page";
import { getMenu } from "../services/pageService";

interface MenuContextType {
  groups: MenuGroup[];
  loading: boolean;
}

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<MenuGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenu()
      .then((menu) => setGroups(menu.groups || []))
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MenuContext.Provider value={{ groups, loading }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
