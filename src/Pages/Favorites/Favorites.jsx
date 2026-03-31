import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";
import NoData from "../NoData/NoData";
import useAuth from "../../Hooks/useAuth";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // favorite state per user (if user has any favorite post)
  const [favorites, setFavorites] = useState(false);

  // fetch all posts
  const { data: favoritePosts = [] } = useQuery({
    queryKey: ["favoritePosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts`);
      return res.data;
    },
  });

  // check if user has any favorite post
  const userHasFavorites = favoritePosts.some((p) => p.favorite?.includes(user?.email));

  // update favorites state safely when data changes
  useEffect(() => {
    setFavorites(userHasFavorites);
  }, [userHasFavorites]);

  // handle favorite toggle
  const handleFavorite = async (id) => {
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      email: user.email,
    });
    queryClient.invalidateQueries(["favoritePosts", user?.email]);
  };
  const favoritePostsByUser = favoritePosts.filter((lesson) =>
    lesson.favorite?.includes(user?.email),
  );
  return (
    <div className="max-w-2xl mx-auto">
      {favoritePostsByUser.length === 0 ? (
        <NoData />
      ) : (
        favoritePostsByUser.map((lesson) => {
          return (
            <div key={lesson._id} className="my-5 p-5 rounded-xl bg-gray-800 text-white relative">
              {/* ⋮ Edit */}
              <span className="absolute right-4 top-3 cursor-pointer">
                <BsThreeDots />
              </span>

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
              <div className="md:flex p-3 items-center">
                <div className="flex-1">
                  <p className="mb-4">{lesson.text}</p>
                </div>
                <div className="flex-1">
                  {lesson.postPhoto && (
                    <img
                      className="rounded-xl mx-auto md:w-50 md:h-50 h-60 w-60"
                      src={lesson.postPhoto}
                      alt=""
                    />
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 mt-4 text-sm bg-gray-700 rounded-xl overflow-hidden">
                <button
                  className={`flex justify-center items-center gap-2 p-2 ${
                    lesson.liked ? "text-blue-400" : ""
                  }`}
                >
                  <AiOutlineLike /> Like ({lesson.likes})
                </button>

                <button onClick={() => handleFavorite(lesson._id)}>
                  <div
                    className={`flex justify-center cursor-pointer items-center gap-2 p-2 ${
                      favoritePostsByUser ? "text-green-400" : "text-white"
                    }`}
                  >
                    ❤️ Favorite
                  </div>
                </button>

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
          );
        })
      )}
    </div>
  );
};

export default Favorites;
