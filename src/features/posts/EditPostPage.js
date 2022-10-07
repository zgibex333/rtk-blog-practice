import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import {
  getPostById,
  selectAllPosts,
  updatePost,
  deletePost,
} from "./postsSlice";

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => getPostById(state, postId));
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.id);

  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h2>Post no found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (!canSave) return;
    try {
      setRequestStatus("pending");
      dispatch(
        updatePost({
          body: content,
          title,
          userId,
          id: post.id,
          reactions: post.reactions,
        })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate(-1);
    } catch (err) {
      console.error("Failed to save the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const onDeletePost = () => {
    if (!canSave) return;
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select
          name="postAuthor"
          defaultValue={userId}
          id="postAuthor"
          onChange={onUserIdChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={onDeletePost} disabled={!canSave}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostPage;
