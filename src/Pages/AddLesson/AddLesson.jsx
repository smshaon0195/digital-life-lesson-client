import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const AddLesson = () => {
  const [lessonText, setLessonText] = useState("");
  const [editLessonId, setEditLessonId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState("");
  // console.log(uploadPhoto);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 🔹 Fetch posts
  const { data: lessons = [], error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/posts");
        return res.data;
      } catch (error) {
        console.error(error);
        return []; // fallback
      }
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
      userName: user.displayName,
      userPhoto: user.photoURL,
      postPhoto: uploadPhoto,
    };

    try {
      await axiosSecure.post("/posts", newLesson);
      setLessonText("");
      setUploadPhoto("");
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
  const handleFavorite = async (id) => {
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      email: user?.email,
    });

    queryClient.invalidateQueries(["posts"]);
  };

  // 🔹 Open Edit Modal
  const handleEditPrompt = (lesson) => {
    setEditLessonId(lesson._id);
    setEditText(lesson.text);
    setIsEditModalOpen(true);
  };
  const handleimage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("image", file);

      const image_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Hosting}`;
      try {
        const res = await axios.post(image_API, imageData);
        setUploadPhoto(res.data.data.url);
      } catch (err) {
        console.error("ImgBB upload error:", err);
      }
    }
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
    <div className=" bg-black text-white  py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ➕ Add Lesson */}
        <div className="bg-black  text-white border-amber-100 border-2 rounded-2xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Share a Life Lesson 🌱</h2>
          <textarea
            rows="1"
            value={lessonText}
            onChange={(e) => setLessonText(e.target.value)}
            placeholder="Write your life lesson..."
            className="w-full bg-gray-800 rounded-lg p-3"
          />
          <label className="inline-block  mt-3 cursor-pointer text-sm text-amber-600 font-medium">
            Click & Upload a Image
            <input type="file" accept="image/*" className="hidden" onChange={handleimage} />
          </label>{" "}
          <br />
          {uploadPhoto && <img className="w-full h-50" src={uploadPhoto} alt="" />}
          {/* <img className="w-full h-50" src={uploadPhoto} alt="" /> */}
          <button
            onClick={handleAddLesson}
            className="mt-4 gradient-btn  bg-amber-500 text-white px-6 py-2 rounded-lg"
          >
            Post Lesson
          </button>
        </div>

        {/* 📜 Lessons */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-black bg-gray-800 text-white relative rounded-2xl shadow p-4"
            >
              {/* ⋮ Edit (Owner Only) */}
              {lesson.email === user?.email && (
                <span
                  onClick={() => handleEditPrompt(lesson)}
                  className="absolute right-4 top-3 cursor-pointer"
                >
                  <BsThreeDots />
                </span>
              )}

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

              <div className="flex justify-between text-sm text-gray-500">
                <button
                  onClick={() => handleLike(lesson._id, lesson.liked)}
                  className={lesson.liked ? "text-blue-600 cursor-pointer" : "cursor-pointer"}
                >
                  👍 Like ({lesson.likes})
                </button>
                <button
                  onClick={() => handleFavorite(lesson._id)}
                  className={`cursor-pointer ${
                    lesson.favorite?.includes(user?.email) ? "text-green-600" : ""
                  }`}
                >
                  ❤️ Favorite
                </button>
                <Link to={`/lesson-details/${lesson._id}`}>
                  💬 Comment ({lesson.comments?.length || 0})
                </Link>

                <button>🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
