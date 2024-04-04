import type { User } from "./user.model.ts";

const URL = "https://jsonplaceholder.typicode.com/users";

export const requestUser = async (id: User["id"]): Promise<User> => {
  const response = await fetch(`${URL}/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};
