export type RequestError = {
  message: null | string;
};

export type Request<D> = {
  data: null | D;
  error: null | RequestError;
  isPending: boolean;
  isError: boolean;
};

export type HnBasic = {
  id: number;
};

export type HnUser = HnBasic & {
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
  delay?: number;
};

export type HnItem = HnBasic & {
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export type post = {
  id: number;
  by: string;
  time: number;
  text: string;
  header: string;
  details: string[];
};
