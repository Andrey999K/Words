import { ReactNode } from "react";

export type ResponseData = {
  comment: string,
  [key: string]: any;
};

export type UserData = {
  comment: string,
  email: string,
  hasPass: boolean,
  history: {
    guess: string, result: string
  }[],
  id: 20,
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
  id: string,
  guess: string,
  result: string,
  pp?: number
}

export type RouteProps = {
  children: ReactNode;
};