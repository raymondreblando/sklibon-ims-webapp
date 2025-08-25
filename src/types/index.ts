export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export type Input = {
  name: string;
  label: string;
};
