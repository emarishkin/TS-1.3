import { FC } from "react";
import { User } from "../Types";

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

export const UserCard: FC<UserCardProps> = ({ user, onDelete }) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onDelete(user.id)}>Удалить</button>
    </div>
  );
};
