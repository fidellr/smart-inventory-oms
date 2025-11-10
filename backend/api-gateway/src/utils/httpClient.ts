import axios from "axios";

export async function forwardRequest(
  baseUrl: string,
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  data?: any
) {
  const url = `${baseUrl}${endpoint}`;
  const response = await axios({ url, method, data });
  return response.data;
}
