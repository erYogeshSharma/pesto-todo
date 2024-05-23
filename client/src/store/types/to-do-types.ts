export type ToDoStatus = "To Do" | "In Progress" | "Complete";
export type TODO = {
  _id?: string;
  name: string;
  status: ToDoStatus;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export const todoStatus = {
  todo: "To Do",
  inProgress: "In Progress",
  complete: "Complete",
};
