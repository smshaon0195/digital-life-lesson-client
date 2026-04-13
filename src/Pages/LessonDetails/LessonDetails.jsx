import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { BsThreeDots } from "react-icons/bs";
import NoComment from "../NoData/NoComment";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState("");

  // edit & delete states
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  // 🔹 Fetch lesson
  const { data: lesson = {} } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  // 🔹 Add comment
  const handleAddComment = async () => {
    if (!commentText.trim() || !user) return;

    const newComment = {
      Text: commentText,
      Email: user.email,
      userName: user.displayName,
      CreatedAt: new Date().toISOString(),
      userPhoto: user.photoURL,
    };

    try {
      await axiosSecure.patch(`/posts/comment/${id}`, newComment);
      setCommentText("");
      queryClient.invalidateQueries(["lesson", id]);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Edit comment
  const handleEditSave = async () => {
    try {
      await axiosSecure.patch(`/posts/comment/edit/${id}`, {
        index: selectedComment.index,
        Text: editText,
      });

      setIsEditing(false);
      setSelectedComment(null);
      queryClient.invalidateQueries(["lesson", id]);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Delete comment
  const handleDeleteComment = async () => {
    try {
      await axiosSecure.patch(`/posts/comment/delete/${id}`, { index: selectedComment.index });

      setSelectedComment(null);
      document.getElementById("delete_modal").close();
      queryClient.invalidateQueries(["lesson", id]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="md:flex w-[95%]  items-start gap-5 mx-auto p-4">
      {/* Lesson */}
      <div className=" border-amber-50 shadow border md:w-7/12 rounded-xl shadow p-5">
        <div className="md:flex  p-3  items-center">
          <div className="flex-1 ">
            <p className=" mb-4">{lesson.text}</p>
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
      </div>

      {/* Comments */}
      <div className="md:w-5/12 space-y-4 mt-5 md:mt-0">
        {/* Add comment */}
        <div className="border border-amber-100 rounded-xl shadow p-5">
          <h3 className="font-semibold mb-2">Write a comment 💬</h3>
          <textarea
            rows="2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border rounded-lg p-3 mb-3"
            placeholder="Write your comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-amber-500 gradient-btn text-white px-5 py-2 rounded-lg"
          >
            Comment
          </button>
        </div>

        {/* Comment list */}
        {lesson.comments?.length === 0 && <NoComment></NoComment>}

        {lesson.comments?.map((item, index) => {
          const comment = item.comment;

          return (
            <div key={index} className=" border border-amber-100 rounded-lg p-3 relative">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={comment.userPhoto || "https://shorturl.at/UI6JP"}
                    className="w-9 h-9 rounded-lg"
                    alt=""
                  />
                  <div>
                    <p className="font-semibold">{comment.userName || user.displayName}</p>
                    <p className="text-sm text-gray-500">{formatTime(comment.CreatedAt)}</p>
                  </div>
                </div>

                {/* Three dots */}
                {user?.email === comment.Email && (
                  <div className="relative">
                    <BsThreeDots
                      className="cursor-pointer"
                      onClick={() => setSelectedComment({ ...comment, index })}
                    />

                    {selectedComment?.index === index && (
                      <div className="absolute right-0 mt-2 bg-white shadow rounded w-24 z-10">
                        <button
                          className="block bg-green-600 text-white hover:cursor-pointer text-btn w-full hover:bg-blue-700 hover:text-white px-3 py-1 "
                          onClick={() => {
                            setIsEditing(true);
                            setEditText(comment.Text);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full px-3 text-btn py-1 text-white  bg-black hover:bg-red-600 hover:text-white  hover:cursor-pointer"
                          onClick={() => document.getElementById("delete_modal").showModal()}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Text / Edit mode */}
              {isEditing && selectedComment?.index === index ? (
                <>
                  <textarea
                    className="w-full border rounded p-2 mt-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn gradient-btn btn-sm bg-green-500"
                      onClick={handleEditSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn  btn-sm"
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedComment(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-justify">{comment.Text}</p>
              )}
            </div>
          );
        })}

        {/* Delete Modal */}
        <dialog id="delete_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Do you want to delete this comment?</h3>
            <div className="modal-action">
              <button className="btn bg-red-600" onClick={handleDeleteComment}>
                Delete
              </button>
              <form method="dialog">
                <button className="btn bg-green-600">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
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
