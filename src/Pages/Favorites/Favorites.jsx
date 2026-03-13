import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: posts = [] } = useQuery({
    queryKey: ["posts", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user.email}`);
      return res.data;
    },
  });
  const favoratePosts = posts.filter((post) => post.favorite);
  console.log(favoratePosts);

  const handleFavorite = async (id, favorite) => {
    await axiosSecure.patch(`/posts/favorite/${id}`, {
      favorite: !favorite,
    });
    queryClient.invalidateQueries(["posts"]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {favoratePosts.map(
        (lesson) => (
          console.log(lesson.favorite),
          (
            <div key={lesson._id} className="my-5 p-5 rounded-xl bg-gray-800 text-white relative">
              {/* ⋮ Edit */}
              <span className="absolute right-4 top-3 cursor-pointer">
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
                  className={`flex justify-center items-center gap-2 p-2 ${
                    lesson.liked ? "text-blue-400" : ""
                  }`}
                >
                  <AiOutlineLike /> Like ({lesson.likes})
                </button>
                <button onClick={() => handleFavorite(lesson._id, lesson.favorite)}>
                  <div
                    className={
                      lesson.favorite === true
                        ? "flex cursor-pointer justify-center items-center gap-2 p-2 text-green-600"
                        : "text-white"
                    }
                  >
                    ❤️ Favorite
                  </div>
                </button>

                <Link
                  to={`/lesson-details/${lesson._id}`}
                  className="flex justify-center items-center gap-2-2 p-2"
                >
                  <FaRegComment /> Comment ({lesson.comments?.length || 0})
                </Link>

                <div className="flex justify-center items-center gap-2 p-2">
                  <FaShare /> Share
                </div>
              </div>
            </div>
          )
        ),
      )}
    </div>
  );
};

export default Favorites;
