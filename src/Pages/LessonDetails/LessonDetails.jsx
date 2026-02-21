import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  // console.log(user);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState("");

  // 🔹 Fetch single lesson
  const { data: lesson = {} } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      // console.log(res);
      return res.data;
    },
  });

  // 🔹 Add Comment
  const handleAddComment = async () => {
    if (!commentText.trim() || !user) return;

    const newComment = {
      Text: commentText,
      Email: user.email,
      userName: user.displayName,
      CreatedAt: new Date().toISOString(),
      userPhoto: user.photoURL,
    };

    setCommentText("");

    try {
      // ✅ PATCH comment – backend wrapper handle করবে
      const { data } = await axiosSecure.patch(`/posts/comment/${id}`, newComment);

      // ✅ Update React Query cache – UI instant update
      queryClient.setQueryData(["lesson", id], data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl text-black mx-auto p-4">
      {/* Lesson */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <p className="text-gray-700">{lesson.text}</p>
      </div>

      {/* Add Comment */}
      <div className="bg-white  rounded-xl shadow p-5 mb-6">
        <h3 className="font-semibold mb-2">Write a comment 💬</h3>

        <textarea
          rows="1"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full border rounded-lg p-3 mb-3 text-blue-600 border-black"
          placeholder="Write your comment..."
        />

        <button onClick={handleAddComment} className="bg-amber-500 text-white px-5 py-2 rounded-lg">
          Comment
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-3">
        {lesson.comments?.length === 0 && (
          <p className="text-2xl text-center text-gray-500 ">😂 No comments yet 😂</p>
        )}

        {lesson.comments?.map((item, index) => {
          const comment = item.comment; // MongoDB wrapper অনুযায়ী
          console.log(comment);
          return (
            <div key={index} className="bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img className="w-9 h-9 rounded-xl text-black" src={user.photoURL} alt="" />
                  <p className="font-semibold text-black">{comment.userName}</p>
                </div>
                <p>{formatTime(comment.CreatedAt)}</p>
              </div>

              <p className="text-gray-700 mt-1">{comment.Text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 🕒 Time formatter
const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default LessonDetails;
