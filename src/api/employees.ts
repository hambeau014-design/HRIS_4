import type { Employee } from "../types/employee";

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(
    "http://localhost:5000/api/v1/employees"
  );

  return response.json();
}