import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

import React from "react";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === Number(userId));
  return <span>{author?.name || "Unknown Author"}</span>;
};

export default PostAuthor;
