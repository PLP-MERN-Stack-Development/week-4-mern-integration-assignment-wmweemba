import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Posts</h2>
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
  </div>
);

export default PostList; 