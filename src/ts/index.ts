type Obj = {
  id: number;
  title: string;
};

type ContextType = {
  massive: Obj[];
  setMassive: (value: any) => void;
  change: number | null;
  setChange: (value: number | null) => void;
};

export type { ContextType, Obj };
