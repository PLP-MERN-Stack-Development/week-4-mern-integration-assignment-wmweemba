import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

const PostContext = createContext();

export function usePosts() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { data, loading, error, fetchData, setData } = useApi("/posts");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch posts on mount and when page/search/filter changes
  useEffect(() => {
    fetchData("GET", null, null, { page, q, category, author }).then((res) => {
      if (res) {
        setData(res.posts);
        setTotal(res.total);
        setPages(res.pages);
      }
    });
    // eslint-disable-next-line
  }, [page, q, category, author]);

  // CRUD actions
  const createPost = async (post) => {
    const newPost = await fetchData("POST", post);
    if (newPost) setData((prev) => [newPost, ...(prev || [])]);
    return newPost;
  };

  const updatePost = async (id, post) => {
    const updated = await fetchData("PUT", post, `/posts/${id}`);
    if (updated) setData((prev) => prev.map((p) => (p._id === id ? updated : p)));
    return updated;
  };

  const deletePost = async (id) => {
    const res = await fetchData("DELETE", null, `/posts/${id}`);
    if (res) setData((prev) => prev.filter((p) => p._id !== id));
    return res;
  };

  return (
    <PostContext.Provider value={{ posts: data || [], loading, error, createPost, updatePost, deletePost, page, setPage, total, pages, q, setQ, category, setCategory, author, setAuthor }}>
      {children}
    </PostContext.Provider>
  );
} 