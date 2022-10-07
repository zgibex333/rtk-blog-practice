import { useSelector } from "react-redux";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const orderPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  }
  if (postsStatus === "succeeded") {
    content = orderPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  }
  if (postsStatus === "error") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
