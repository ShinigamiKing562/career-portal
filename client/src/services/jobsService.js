import api from "./api";

export async function getJobs() {
  const response = await api.get("/api/jobs");
  return response.data;
}
