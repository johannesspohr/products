import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ErrorApiResponse = {
  body: {
    field: string;
    message: string;
  }[];
};

export function isErrorApiResponse(
  response: any,
): response is ErrorApiResponse {
  return (
    typeof response === "object" &&
    response &&
    "body" in response &&
    response.body &&
    response.body.length > 0 &&
    response.body[0].field
  );
}
