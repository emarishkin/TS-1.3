import { FC, useEffect, useState } from "react";
import { User } from "../Types";
import { fetchUsers } from "../userService";
import { UserCard } from "./UserCard";

export const UserList: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};
