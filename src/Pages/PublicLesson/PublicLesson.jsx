import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const PublicLesson = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔹 Fetch ALL PUBLIC posts
  const { data: lessons = [] } = useQuery({
    queryKey: ["public-posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts?visibility=public");
      return res.data;
    },
  });

  // 🔹 Like handler
  const handleLike = async (id, liked) => {
    if (!user) {
      return toast.error("Please Login and Like this posts");
    }
    await axiosSecure.patch(`/posts/like/${id}`, { liked });
    queryClient.invalidateQueries({ queryKey: ["public-posts"] });
  };
  // 🔹 Favorite
  const handleFavorite = async (id, favorite) => {
    if (!user) {
      return toast.error("Please Login and Favorite this posts");
    }
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      favorite: !favorite,
    });
    queryClient.invalidateQueries(["posts"]);
  };
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {lessons.map((lesson) => (
        <div key={lesson._id} className="my-5 p-5 rounded-xl bg-gray-800 text-white">
          {/* User Info */}
          <div className="flex gap-3 items-center mb-3">
            <img
              className="w-10 h-10 rounded-full"
              src={lesson.userPhoto || "https://shorturl.at/UI6JP"}
              alt=""
            />
            <div>
              <h3 className="font-bold">{lesson.userName || "Anonymous"}</h3>
              <p className="text-gray-400 text-sm">
                {new Date(lesson.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {lesson.category} {lesson.emotionalTone}
              </p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold mb-2">{lesson.title}</h2>

          <div className="md:flex  p-3  items-center">
            <div className="flex-1 ">
              <p className="">{lesson.text}</p>
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
              className={`flex justify-center cursor-pointer items-center gap-2 p-2 ${
                lesson.liked ? "text-blue-400" : "cursor-pointer"
              }`}
            >
              <AiOutlineLike /> Like ({lesson.likes})
            </button>

            <div
              onClick={() => handleFavorite(lesson._id, lesson.favorite)}
              className={
                lesson.favorite
                  ? "text-red-500 flex justify-center items-center gap-2 p-2 cursor-pointer"
                  : "flex justify-center items-center gap-2 p-2 cursor-pointer"
              }
            >
              ❤️ Favorite
            </div>

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
    </div>
  );
};

export default PublicLesson;
