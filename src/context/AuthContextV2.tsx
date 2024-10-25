import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  acceso: boolean;
  setAcceso: Dispatch<SetStateAction<boolean>>;
  user: { nombre: string; usuario: string; ubicacion: string; contacto: string } | null;
  setUser: Dispatch<SetStateAction<{ nombre: string; usuario: string; ubicacion: string; contacto: string } | null>>;
}

export const AuthContextV2 = createContext<AuthContextType | null>(null);