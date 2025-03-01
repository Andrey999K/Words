import { ReactNode } from "react";

export type ResponseData = {
  comment: string,
  [key: string]: any;
};

export type UserData = {
  comment: string,
  email: string,
  has_pass: boolean,
  history: {
    guess: string, result: string
  }[],
  id: number,
  join_code: string,
  pp: number,
  username: string
}

export type ResponseType<T = ResponseData> = {
  data: T,
  request_type: "error" | "success",
  status: string
}

export type LoginFields = {
  email?: string;
  password?: string;
  remember?: string;
};

export type Guess = {
  id?: string,
  guess: string,
  result: string,
  pp?: number
  player_num?: number
}

export type RouteProps = {
  children: ReactNode;
};

export type Hint = {
  comment: string,
  hint: string
}

export type ScoreboardType = {
  email: string,
  pp: number
}