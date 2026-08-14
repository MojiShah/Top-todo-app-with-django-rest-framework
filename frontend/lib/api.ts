import { Todo, TodoPayload } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");
const TODO_URL = `${API_URL}/todo/`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data?.detail) message = data.detail;
      else if (typeof data === "object") message = JSON.stringify(data);
    } catch {/* Response is not JSON */}
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(TODO_URL);
  return handleResponse<Todo[]>(response);
}

export async function getTodo(id: number): Promise<Todo> {
  const response = await fetch(`${TODO_URL}${id}/`);
  return handleResponse<Todo>(response);
}

export async function createTodo(payload: TodoPayload): Promise<Todo> {
  const response = await fetch(TODO_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(payload),
  });
  return handleResponse<Todo>(response);
}

export async function updateTodo(id: number,payload: TodoPayload): Promise<Todo> {
  const response = await fetch(`${TODO_URL}${id}/`,{
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(payload)
    });
  return handleResponse<Todo>(response);
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${TODO_URL}${id}/`,{method: "DELETE",});
  await handleResponse<void>(response);
}