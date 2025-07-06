import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";

const Comments = ({ postId }) => {
  const { user, token } = useAuth();
  const { data: comments, loading, error, fetchData, setData } = useApi(`/posts/${postId}/comments`);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments on mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user?._id, content }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setData((prev) => [...(prev || []), newComment]);
      setContent("");
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4 mb-4">
        {(comments || []).map((comment) => (
          <li key={comment._id} className="bg-gray-100 p-3 rounded">
            <div className="text-sm text-gray-700">{comment.content}</div>
            <div className="text-xs text-gray-500 mt-1">{comment.user?.username || "Anonymous"} • {new Date(comment.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      {token ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="text-gray-500">Login to add a comment.</div>
      )}
    </div>
  );
};

export default Comments; 