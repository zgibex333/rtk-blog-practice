import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { getPostById } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

let PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => getPostById(state, postId));
  return (
    <article>
      <h3>{post.title}</h3>
      <div className="postCredit">
        <p className="excerpt">{post.body.substring(0, 75)}</p>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
