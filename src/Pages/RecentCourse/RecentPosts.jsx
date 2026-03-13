import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaLongArrowAltRight, FaRegComment, FaShare } from "react-icons/fa";
import { Link } from "react-router";
import { AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const RecentPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { data: posts = [] } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const result = await axiosSecure.get("/posts");
      return result.data;
    },
  });
  const limitedPosts = posts.slice(0, 6);
  return (
    <div className="md:w-6/12  mx-auto">
      <div className="divParent   gap-7">
        {limitedPosts.map((post) => {
          console.log(post);
          return (
            <div key={post._id} className="my-5 p-5  rounded-xl bg-gray-800 text-white relative">
              {/* ⋮ Edit */}
              <span className="absolute right-4 top-3 cursor-pointer">
                <BsThreeDots />
              </span>

              {/* User Info */}
              <div className="flex gap-3 items-center mb-3">
                <img className="w-10 h-10 rounded-full" src={post.userPhoto || "https://shorturl.at/UI6JP"} alt="" />
                <div>
                  <h3 className="font-bold">{post.userName}</h3>
                  <p className="text-gray-400 text-sm">Just now</p>
                </div>
              </div>

              {/* Post */}
              <div className="md:flex  p-3  items-center">
                <div className="flex-1 ">
                  <p className="text-white mb-4">{post.text}</p>
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
              <div className="grid grid-cols-4 mt-4 text-sm bg-gray-700 rounded-xl overflow-hidden">
                <button
                  className={`flex justify-center items-center gap-2 p-2 ${
                    post.liked ? "text-blue-400" : ""
                  }`}
                >
                  <AiOutlineLike /> Like ({post.likes})
                </button>

                <div className="flex justify-center items-center gap-2 p-2">❤️ Favorite</div>

                <Link
                  to={`/lesson-details/${post._id}`}
                  className="flex justify-center items-center gap-2-2 p-2"
                >
                  <FaRegComment /> Comment ({post.comments?.length || 0})
                </Link>

                <div className="flex justify-center items-center gap-2 p-2">
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
