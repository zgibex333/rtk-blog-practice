import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePost";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EditPostPage from "./features/posts/EditPostPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
