export interface Todo {
  id: number;
  title: string;
  content: string;
  priority: number;
  is_done: boolean;
}

export interface TodoPayload {
  title: string;
  content: string;
  priority: number;
  is_done: boolean;
}