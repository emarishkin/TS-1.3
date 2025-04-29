import { User } from "./Types";

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
   
    const data = await response.json();
    return data;
  };
