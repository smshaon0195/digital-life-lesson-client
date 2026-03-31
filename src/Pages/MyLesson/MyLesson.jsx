import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loding from "../NoData/Loding";
import NoData from "../NoData/NoData";

const MyLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editLessonId, setEditLessonId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Favorite Handle
  const handleFavorite = async (id) => {
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      email: user.email,
    });
    queryClient.invalidateQueries(["posts"]);
  };

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

  const handleDeleteLesson = async () => {
    await axiosSecure.delete(`/posts/${deleteId}`);

    setIsDeleteModalOpen(false);
    setDeleteId(null);

    queryClient.invalidateQueries(["my-posts", user?.email]);
  };

  if (isLoading)
    return (
      <p className="text-white">
        <Loding></Loding>
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto">
      {lessons.length === 0 ? (
        <NoData> </NoData>
      ) : (
        lessons.map((lesson) => (
          <div key={lesson._id} className="my-5 p-5 rounded-xl bg-gray-800 text-white relative">
            {/* ⋮ Edit */}
            <span
              onClick={() => setOpenMenuId(openMenuId === lesson._id ? null : lesson._id)}
              className="absolute right-4 top-3 cursor-pointer"
            >
              <BsThreeDots />
            </span>

            {openMenuId === lesson._id && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-24">
                <button
                  onClick={() => {
                    handleEditPrompt(lesson);
                    setOpenMenuId(null);
                  }}
                  className="block w-full text-left px-3 cursor-pointer py-2 hover:bg-gray-200"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => {
                    setDeleteId(lesson._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="block cursor-pointer w-full text-left px-3 py-2 hover:bg-red-200"
                >
                  🗑 Delete
                </button>
              </div>
            )}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white text-black w-full max-w-sm rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3">Delete Lesson</h3>

                  <p className="mb-5">Are you sure you want to delete this lesson?</p>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="bg-gray-300 cursor-pointer px-4 py-1 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDeleteLesson}
                      className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* User Info */}
            <div className="flex gap-3 items-center mb-3">
              <img
                className="w-10 h-10 rounded-full"
                src={lesson.userPhoto || "https://shorturl.at/UI6JP"}
                alt=""
              />
              <div>
                <h3 className="font-bold">{lesson.userName}</h3>
                <p className="text-gray-400 text-sm">
                  {new Date(lesson.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Post */}
            <div className="md:flex  p-3  items-center">
              <div className="flex-1 ">
                <p className="text-white mb-4">{lesson.text}</p>
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
            <div className="grid grid-cols-4 mt-4 gap-7 text-sm bg-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => handleLike(lesson._id, lesson.liked)}
                className={`flex justify-center items-center  gap-2 p-2 ${
                  lesson.liked ? "text-blue-400 cursor-pointer" : "cursor-pointer"
                }`}
              >
                <AiOutlineLike /> Like ({lesson.likes})
              </button>

              <button onClick={() => handleFavorite(lesson._id, lesson.favorite)}>
                <div
                  className={
                    lesson.favorite?.includes(user.email)
                      ? "flex justify-center cursor-pointer items-center  p-2 text-green-600"
                      : "flex justify-center cursor-pointer items-center  p-2"
                  }
                >
                  ❤️ Favorite
                </div>
              </button>

              <Link
                to={`/lesson-details/${lesson._id}`}
                className="flex justify-center  cursor-pointer items-center gap-2 p-2"
              >
                <FaRegComment /> Comment ({lesson.comments?.length || 0})
              </Link>

              <div className="flex cursor-pointer justify-center  items-center gap-2 p-2">
                <FaShare /> Share
              </div>
            </div>
          </div>
        ))
      )}

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
                className="bg-gray-300 cursor-pointer px-4 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateLesson}
                className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded"
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
