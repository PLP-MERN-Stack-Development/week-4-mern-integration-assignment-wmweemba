import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "@/context/PostContext";
import { categoryService } from "@/services/api";

const Pagination = () => {
  const { page, setPage, pages } = usePosts();
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  );
};

const PostFilters = () => {
  const { q, setQ, category, setCategory, author, setAuthor, setPage } = usePosts();
  const [categories, setCategories] = useState([]);
  const authors = ["", "Alice", "Bob", "Charlie"];

  useEffect(() => {
    // Fetch categories from backend
    categoryService.getAllCategories().then((data) => {
      setCategories(data || []);
    });
  }, []);

  const handleSearch = (e) => {
    setQ(e.target.value);
    setPage(1);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-end">
      <input
        type="text"
        placeholder="Search posts..."
        value={q}
        onChange={handleSearch}
        className="border rounded px-3 py-2"
      />
      <select value={category} onChange={handleCategory} className="border rounded px-3 py-2">
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <select value={author} onChange={handleAuthor} className="border rounded px-3 py-2">
        {authors.map((a) => (
          <option key={a} value={a}>{a ? a : "All Authors"}</option>
        ))}
      </select>
    </div>
  );
};

const PostList = ({ posts }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Posts</h2>
    <PostFilters />
    {posts.length === 0 ? (
      <p className="text-gray-500">No posts found.</p>
    ) : (
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-blue-700 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
            <div className="text-xs text-gray-400 mt-2">By {post.author || "Anonymous"}</div>
          </li>
        ))}
      </ul>
    )}
    <Pagination />
  </div>
);

export default PostList; 