import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import PostView from "@/components/PostView";
import PostForm from "@/components/PostForm";
import { PostProvider, usePosts } from "@/context/PostContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

function PostListPage() {
  const { posts, loading, error } = usePosts();
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <PostList posts={posts} />
    </>
  );
}

function PostViewPage() {
  const { posts } = usePosts();
  const { id } = useParams();
  const post = posts.find((p) => p._id === id);
  return <PostView post={post} />;
}

function PostFormPage({ edit }) {
  const { posts, createPost, updatePost, loading } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();
  const initialData = edit ? posts.find((p) => p._id === id) : {};

  const handleSubmit = async (data) => {
    if (edit) {
      await updatePost(id, data);
      navigate(`/posts/${id}`);
    } else {
      const newPost = await createPost(data);
      if (newPost?._id) navigate(`/posts/${newPost._id}`);
    }
  };

  return <PostForm initialData={initialData} onSubmit={handleSubmit} loading={loading} />;
}

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<PostListPage />} />
              <Route path="/posts/:id" element={<PostViewPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/create" element={<ProtectedRoute><PostFormPage edit={false} /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><PostFormPage edit={true} /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
