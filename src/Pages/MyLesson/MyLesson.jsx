import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editLessonId, setEditLessonId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 🔹 Fetch ONLY my posts
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-posts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user.email}`);
      return res.data;
    },
  });

  // 🔹 Like
  const handleLike = async (id, liked) => {
    await axiosSecure.patch(`/posts/like/${id}`, { liked });
    queryClient.invalidateQueries(["my-posts"]);
  };

  // 🔹 Open edit modal
  const handleEditPrompt = (lesson) => {
    setEditLessonId(lesson._id);
    setEditText(lesson.text);
    setIsEditModalOpen(true);
  };

  // 🔹 Update lesson
  const handleUpdateLesson = async () => {
    await axiosSecure.patch(`/posts/${editLessonId}`, {
      text: editText,
    });

    setIsEditModalOpen(false);
    setEditLessonId(null);
    setEditText("");
    queryClient.invalidateQueries(["my-posts"]);
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {lessons.map((lesson) => (
        <div key={lesson._id} className="my-5 p-5 rounded-xl bg-gray-800 text-white relative">
          {/* ⋮ Edit */}
          <span
            onClick={() => handleEditPrompt(lesson)}
            className="absolute right-4 top-3 cursor-pointer"
          >
            <BsThreeDots />
          </span>

          {/* User Info */}
          <div className="flex gap-3 items-center mb-3">
            <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="" />
            <div>
              <h3 className="font-bold">{user.displayName}</h3>
              <p className="text-gray-400 text-sm">Just now</p>
            </div>
          </div>

          {/* Post */}
          <div className="md:flex  p-3  items-center">
            <div className="flex-1 ">
              <p className="text-gray-700 mb-4">{lesson.text}</p>
            </div>
            <div className="flex-1  ">
              {lesson.postPhoto && (
                <img
                  className="rounded-xl mx-auto  md:w-50  md:h-50  h-60 w-60"
                  src={lesson.postPhoto}
                  alt=""
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-4 mt-4 text-sm bg-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => handleLike(lesson._id, lesson.liked)}
              className={`flex justify-center items-center gap-2 p-2 ${
                lesson.liked ? "text-blue-400" : ""
              }`}
            >
              <AiOutlineLike /> Like ({lesson.likes})
            </button>

            <div className="flex justify-center items-center gap-2 p-2">❤️ Favorite</div>

            <Link
              to={`/lesson-details/${lesson._id}`}
              className="flex justify-center items-center gap-2 p-2"
            >
              <FaRegComment /> Comment ({lesson.comments?.length || 0})
            </Link>

            <div className="flex justify-center items-center gap-2 p-2">
              <FaShare /> Share
            </div>
          </div>
        </div>
      ))}

      {/* ✏️ Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-black w-full max-w-md rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Edit Lesson ✏️</h3>

            <textarea
              rows="4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
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

export default MyLesson;
