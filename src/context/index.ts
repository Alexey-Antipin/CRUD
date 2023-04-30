import { createContext } from "react";
import { ContextType } from "../ts";

export const Context = createContext<ContextType | null>(null);
