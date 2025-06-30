import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

const PostContext = createContext();

export function usePosts() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { data: posts, loading, error, fetchData, setData } = useApi("/posts");

  // Fetch posts on mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

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
    <PostContext.Provider value={{ posts: posts || [], loading, error, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
} 