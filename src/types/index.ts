import { ReactNode } from "react";

export type ResponseData = {
  comment: string,
  [key: string]: any;
};

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
  id: number,
  guess: string,
  result: string,
  pp?: number
}

export type RouteProps = {
  children: ReactNode;
};