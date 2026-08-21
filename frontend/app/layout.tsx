import type { Metadata } from "next";

import "./globals.css";
import { Todo } from "@/types/todo";
import { TodoProvider } from "@/context/TodoContext";

export const metadata: Metadata = {
  title: "Todo Manager",
  description:
    "Next.js Todo application with Django REST Framework",
};


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

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const initialTodos = await getInitialTodos();

  return (
    <html lang="en">
      <body>
        <TodoProvider initialTodos={initialTodos}>
        {children}
        </TodoProvider>
      </body>
    </html>
  );
}