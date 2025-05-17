export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  important: boolean;
  createdAt?: string; // se estiver usando no sort
};
