import React, { useState, useEffect } from "react";

const PostForm = ({ initialData = {}, onSubmit, loading }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.imageUrl || "");

  useEffect(() => {
    setTitle(initialData.title || "");
    setContent(initialData.content || "");
    setAuthor(initialData.author || "");
    setImagePreview(initialData.imageUrl || "");
    setImage(null);
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (image) formData.append("image", image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl mx-auto space-y-4" encType="multipart/form-data">
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
        <label className="block mb-1 font-medium">Featured Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded px-3 py-2"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 max-h-48 rounded" />
        )}
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