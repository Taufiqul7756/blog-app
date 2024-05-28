"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAndUsers, setPage } from "../redux/postSlice";
import { fetchCommentsByPostId } from "../redux/commentsSlice";
import { getPaginationControls } from "../utils/pagination";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaCommentAlt } from "react-icons/fa";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const Timeline = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, page, totalPages } = useSelector(
    (state) => state.posts
  );
  const comments = useSelector((state) => state.comments);

  const [showComments, setShowComments] = useState({});
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});

  useEffect(() => {
    dispatch(fetchPostsAndUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        dispatch(fetchCommentsByPostId(post.id));
      });
    }
  }, [dispatch, posts]);

  const toggleComments = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
    if (!showComments[postId]) {
      dispatch(fetchCommentsByPostId(postId));
    }
  };

  const toggleLike = (commentId) => {
    setLikedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    if (dislikedComments[commentId]) {
      setDislikedComments((prevState) => ({
        ...prevState,
        [commentId]: false,
      }));
    }
  };

  const toggleDislike = (commentId) => {
    setDislikedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    if (likedComments[commentId]) {
      setLikedComments((prevState) => ({
        ...prevState,
        [commentId]: false,
      }));
    }
  };

  return (
    <div className="lg:px-72 md:px-16 sm:px-5">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
              <div className="grid gap-2">
                <h3 className="text-xl font-bold font-sans">
                  Title: {post.title}
                </h3>
                <span className="text-lg font-normal">
                  <span className="font-bold text-base font-serif ">
                    Description:
                  </span>{" "}
                  <span className="font-serif"> {post.body}</span>
                </span>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm font-bold ">
                  <div class="flex items-center gap-2  italic md:flex-row">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 640 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"></path>
                    </svg>{" "}
                    <span className="text-blue-500 font-serif">
                      {post.userName}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="flex justify-center items-center gap-3">
                    <FaCommentAlt className="text-sm" />
                    <span className="text-sm">
                      Comments (
                      {comments[post.id] ? comments[post.id].length : 0})
                    </span>
                  </div>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className=" text-xl font-bold cursor-pointer"
                  >
                    {showComments[post.id] ? (
                      <TiArrowSortedUp className=" " />
                    ) : (
                      <TiArrowSortedDown className=" " />
                    )}
                  </button>
                </div>
              </div>
              {showComments[post.id] && (
                <div className="mt-4 px-10">
                  {comments[post.id] ? (
                    comments[post.id].map((comment) => (
                      <div
                        key={comment.id}
                        className="grid gap-2 px-10 py-3 border-t"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex justify-center items-center gap-2 font-sans text-lg">
                            <FaCommentAlt className="text-sm" />
                            {comment.name}
                          </div>

                          <div className="flex gap-5 justify-center items-center">
                            <SlLike
                              className={`text-lg cursor-pointer ${
                                likedComments[comment.id] ? "text-blue-500" : ""
                              }`}
                              onClick={() => toggleLike(comment.id)}
                            />
                            <SlDislike
                              className={`text-lg cursor-pointer ${
                                dislikedComments[comment.id]
                                  ? "text-red-500"
                                  : ""
                              }`}
                              onClick={() => toggleDislike(comment.id)}
                            />
                          </div>
                        </div>
                        <p className="text-gray-800 font-sans text-base font-normal">
                          {comment.body}
                        </p>

                        <div className=" text-sm font-sans lg:flex sm:grid justify-start items-center gap-2 mt-3">
                          <span>Commented by</span>
                          {comment.email}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-lg">Loading comments...</div>
                  )}
                </div>
              )}
            </div>
          ))}
          {!loading && totalPages > 1 && (
            <div className="flex justify-end mt-8">
              {getPaginationControls(page, totalPages, (page) =>
                dispatch(setPage(page))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Timeline;
