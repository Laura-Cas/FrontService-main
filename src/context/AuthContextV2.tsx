import React, { createContext, useContext, Dispatch, SetStateAction } from 'react';



interface AuthContextType {

  acceso: boolean;

  setAcceso: Dispatch<SetStateAction<boolean>>;

  user: boolean;

  setUser: Dispatch<SetStateAction<boolean>>;

}



export const AuthContextV2 = createContext<AuthContextType | null>(null);