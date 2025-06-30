import React from "react";

const PostView = ({ post }) => {
  if (!post) return <p className="text-gray-500">Post not found.</p>;
  return (
    <article className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-400 mb-4">By {post.author || "Anonymous"}</div>
      <div className="prose max-w-none text-gray-800">{post.content}</div>
    </article>
  );
};

export default PostView; 