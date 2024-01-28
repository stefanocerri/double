
"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the type for the context
type SetupContextType = {
  state: { [key: string]: any }
  setState: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

// Initialize the context with a default value of undefined and type it
const SetupContext = createContext<SetupContextType | undefined>(undefined);

// 2. Type children
type SetupProviderProps = {
  children: ReactNode;
}


export const SetupProvider: React.FC<SetupProviderProps> = ({ children }) => {

  const [state, setState] = useState<{ [key: string]: any }>({});

  return (
    <SetupContext.Provider
      value={{
        state,
        setState
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

export const useSetup = () => {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error("useSetup must be used within a SetupProvider");
  }
  return context;
};
