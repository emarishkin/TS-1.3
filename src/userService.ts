import { User } from "./Types";

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Ошибка загрузки пользователей");
    }
    const data = await response.json();
    return data;
  };
