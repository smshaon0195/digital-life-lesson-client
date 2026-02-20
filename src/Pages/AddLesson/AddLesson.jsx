import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const AddLesson = () => {
  const [lessonText, setLessonText] = useState("");
  const [editLessonId, setEditLessonId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 🔹 Fetch posts
  const { data: lessons = [], error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/posts");
      return res.json();
    },
  });

  // 🔹 Add lesson
  const handleAddLesson = async () => {
    if (!lessonText.trim()) return;

    const newLesson = {
      text: lessonText,
      email: user?.email, // owner
      likes: 0,
      comments: [],
      favorite: false,
    };

    try {
      await axiosSecure.post("/posts", newLesson);
      setLessonText("");
      queryClient.invalidateQueries(["posts"]);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Like
  const handleLike = async (id, liked) => {
    await axiosSecure.patch(`/posts/like/${id}`, { liked });
    queryClient.invalidateQueries(["posts"]);
  };

  // 🔹 Favorite
  const handleFavorite = async (id, favorite) => {
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      favorite: !favorite,
    });
    queryClient.invalidateQueries(["posts"]);
  };

  // 🔹 Open Edit Modal
  const handleEditPrompt = (lesson) => {
    setEditLessonId(lesson._id);
    setEditText(lesson.text);
    setIsEditModalOpen(true);
  };

  // 🔹 Update Lesson
  const handleUpdateLesson = async () => {
    try {
      await axiosSecure.patch(`/posts/${editLessonId}`, {
        text: editText,
      });

      setIsEditModalOpen(false);
      setEditLessonId(null);
      setEditText("");
      queryClient.invalidateQueries(["posts"]);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <p className="text-center text-red-500">Something went wrong</p>;
  }

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-amber-50 to-gray-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ➕ Add Lesson */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Share a Life Lesson 🌱</h2>

          <textarea
            rows="4"
            value={lessonText}
            onChange={(e) => setLessonText(e.target.value)}
            placeholder="Write your life lesson..."
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleAddLesson}
            className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg"
          >
            Post Lesson
          </button>
        </div>

        {/* 📜 Lessons */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white relative rounded-2xl shadow p-4">
              {/* ⋮ Edit (Owner Only) */}
              {lesson.email === user?.email && (
                <span
                  onClick={() => handleEditPrompt(lesson)}
                  className="absolute right-4 top-3 cursor-pointer"
                >
                  <BsThreeDots />
                </span>
              )}

              <p className="text-gray-700 mb-4">{lesson.text}</p>

              <div className="flex justify-between text-sm text-gray-500">
                <button
                  onClick={() => handleLike(lesson._id, lesson.liked)}
                  className={lesson.liked ? "text-blue-600" : ""}
                >
                  👍 Like ({lesson.likes})
                </button>

                <Link to="/lesson-Details">💬 Comment ({lesson.comments?.length || 0})</Link>

                <button
                  onClick={() => handleFavorite(lesson._id, lesson.favorite)}
                  className={lesson.favorite ? "text-red-500" : ""}
                >
                  ❤️ Favorite
                </button>

                <button>🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✏️ Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Edit Lesson ✏️</h3>

            <textarea
              rows="4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditLessonId(null);
                  setEditText("");
                }}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateLesson}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLesson;
