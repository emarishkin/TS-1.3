import { User } from "./Types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  const createdUser = await response.json();
  return {
    ...createdUser,
    id: Date.now() // подставим локальный ID, потому что API не сохраняет данные реально
  };
};
