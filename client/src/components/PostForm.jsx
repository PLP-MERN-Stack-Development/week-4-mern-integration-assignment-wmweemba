import React, { useState, useEffect } from "react";
import { categoryService } from "@/services/api";

const PostForm = ({ initialData = {}, onSubmit, loading }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setTitle(initialData.title || "");
    setContent(initialData.content || "");
    setAuthor(initialData.author || "");
    setCategory(initialData.category || "");
  }, [initialData]);

  useEffect(() => {
    // Fetch categories from backend
    categoryService.getAllCategories().then((data) => {
      setCategories(data || []);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      author,
      category,
    };
    onSubmit(postData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-2">{initialData._id ? "Edit Post" : "Create Post"}</h2>
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Saving..." : initialData._id ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm; 