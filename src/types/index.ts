export type Response = {
  result: {
    data: {
      comment: string
    },
    request_type: "error" | "success",
    status: number
  }
}