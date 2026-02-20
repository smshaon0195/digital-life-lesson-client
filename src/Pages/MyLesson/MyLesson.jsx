import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { FcDislike, FcLike } from "react-icons/fc";
import { Link } from "react-router";

const MyLesson = () => {
  return (
    <div>
      <div className="my-5 w-[95%] mx-auto p-5 rounded-xl bg-gray-800">
        <div className="parent ">
          <div className="nameDate flex gap-3 items-center ">
            <div className="profilePhoto">
              <img className="w-10 h-10 bg-white rounded-full" src="" alt="" />
            </div>
            <div>
              <Link to={"/profile"}>
                <h3 className="font-bold text-xl">Shaon Hossen</h3>
              </Link>

              <p className="text-gray-400">
                10/12/2026 <span>times ago</span>
              </p>
            </div>
          </div>
          <div className="  mb-3">
            <div className="postDetails my-3 bg-gray-600">
              <img src="" alt="" />
              <p className=" px-5 py-3 border-gray-500 rounded-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente amet similique
                sunt repellendus earum voluptate!
              </p>
            </div>

            <div className="comment px-5">
              <div className="nameDate flex gap-3  ">
                <div className="profilePhoto mt-2">
                  <img className="w-7 h-7 bg-white rounded-full" src="" alt="" />
                </div>
                <div>
                  <div className="bg-gray-500 px-2 p-1 rounded-xl">
                    <h3 className="font-bold ">Shaon Hossen</h3>
                    <p className="text-gray-200">
                      <p className="">this is comment</p>
                    </p>
                  </div>
                  <p className="text-[12px] mt-2 cursor-pointer">Like</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="likeCommentShare grid grid-cols-4 rounded-xl overflow-hidden ">
          <div className="like ">
            {/* <FcDislike />  */}
            <Link className="flex justify-center items-center p-1 gap-2 ">
              {" "}
              <AiOutlineLike />
              <span>Like (50)</span>
            </Link>
          </div>
          <div className="like ">
            {/* <FcDislike />  */}
            <Link className="flex justify-center items-center p-1 gap-2 ">
              {" "}
              <FcLike /> <span>Faborate (15)</span>
            </Link>
          </div>
          <div className="comment ">
            <Link className="flex justify-center items-center p-1 gap-2 ">
              {" "}
              <FaRegComment /> <span>Comment (45)</span>
            </Link>
          </div>
          <div className="share  ">
            <Link className="flex justify-center items-center p-1 gap-2 ">
              <FaShare /> <span>Share (40)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLesson;
