import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaLongArrowAltRight, FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";
import { AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import Favorites from "./../Favorites/Favorites";
import toast from "react-hot-toast";

const RecentPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: posts = [] } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const result = await axiosSecure.get("/posts");
      return result.data;
    },
  });
  const limitedPosts = posts.slice(0, 6);

  // 🔹 Like handler
  const handleLike = async (id, liked) => {
    if (!user) {
      return toast.error("Please Login and Like this posts");
    }
    await axiosSecure.patch(`/posts/like/${id}`, { liked });
    queryClient.invalidateQueries(["posts"]);
  };
  // 🔹 Favorite
  const handleFavorite = async (id) => {
    if (!user) {
      return toast.error("Please Login and Favorite this posts");
    }
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      email: user.email,
    });
    queryClient.invalidateQueries(["posts"]);
  };

  return (
    <div className="md:w-6/12 p-5  mx-auto">
      <div className="divParent   gap-7">
        {limitedPosts.map((post) => {
          return (
            <div key={post._id} className="my-5 p-5 border-amber-100 border rounded-xl shadow-2xl relative">
              {/* ⋮ Edit */}
              <span className="absolute right-4 top-3 cursor-pointer">
                <BsThreeDots />
              </span>

              {/* User Info */}
              <div className="flex gap-3 items-center mb-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={post.userPhoto || "https://shorturl.at/UI6JP"}
                  alt=""
                />
                <div>
                  <h3 className="font-bold">{post.userName}</h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Post */}
              <div className="md:flex  p-3  items-center">
                <div className="flex-1 ">
                  <p className=" mb-4">{post.text}</p>
                </div>
                <div className="flex-1  ">
                  {post.postPhoto && (
                    <img
                      className="rounded-xl mx-auto  md:w-50  md:h-50  h-60 w-60"
                      src={post.postPhoto}
                      alt=""
                    />
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 mt-4 sm:text-sm text-[12px]   rounded-xl overflow-hidden">
                <button
                  onClick={() => handleLike(post._id, post.liked)}
                  className={`flex flex-1 justify-center cursor-pointer items-center gap-2 p-2 ${
                    post.liked ? "text-blue-400" : "cursor-pointer "
                  }`}
                >
                  <div className="whitespace-nowrap flex items-center">
                    <AiOutlineLike /> Like ({post.likes})
                  </div>
                </button>

                <div
                  onClick={() => handleFavorite(post._id)}
                  className={`cursor-pointer  ${
                    post.favorite?.includes(user?.email)
                      ? "text-green-600 flex flex-1  justify-center items-center gap-2 p-2 "
                      : "flex justify-center whitespace-nowrap items-center gap-2 p-2"
                  }`}
                >
                  ❤️ Favorite
                </div>

                <Link
                  to={`/lesson-details/${post._id}`}
                  className="flex whitespace-nowrap leading-none justify-center flex-1 items-center  gap-2 p-2"
                >
                  <div className="flex  gap-2 items-center  ">
                    <FaRegComment />
                    Comment ({post.comments?.length || 0})
                  </div>
                </Link>

                <div className="flex flex-1 justify-center items-center gap-2 p-2">
                  <FaShare /> Share
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-3">
        <Link
          to={"/dashboard/Public-Lesson"}
          className="flex items-center gap-2 font-bold hover:text-green-700"
        >
          View All Post
          <FaLongArrowAltRight />
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;
