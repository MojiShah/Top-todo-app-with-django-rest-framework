import TodoManager from "@/components/TodoManager";
import { TodoProvider } from "@/context/TodoContext";
import { Todo } from "@/types/todo";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getInitialTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todo/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load todos");
  }

  return response.json();
}

export default async function HomePage() {
  const initialTodos = await getInitialTodos();

  return (
    <TodoProvider initialTodos={initialTodos}>
      <TodoManager />
    </TodoProvider>
  );
}