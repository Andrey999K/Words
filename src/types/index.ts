export type ResponseData = {
  comment: string,
  [key: string]: any;
};

export type ResponseType = {
  data: ResponseData,
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
  word: string,
  guess: string,
}