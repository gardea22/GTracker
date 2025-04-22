// types.ts
export interface Project {
  name: string;
  type: string;
  chain: string;
  status: string;
  twitter?: string;
  website?: string;
  cost: number;
  checkedUntil?: number;
}
