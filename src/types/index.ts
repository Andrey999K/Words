export type ResponseType = {
  data: {
    comment: string
  },
  request_type: "error" | "success",
  status: string
}