export type ResponseData = {
  comment: string,
  [key: string]: any;
};

export type ResponseType = {
  data: ResponseData,
  request_type: "error" | "success",
  status: string
}