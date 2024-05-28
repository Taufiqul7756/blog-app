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
    <div className="w-2/3">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">Title: {post.title}</h3>
                <span className="text-lg font-normal">
                  <span className="font-bold text-base">Description:</span>{" "}
                  {post.body}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm font-bold ">
                  <span className="text-blue-500">Author: </span>{" "}
                  {post.userName}
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
                          <span className="text-blue-400 text-lg">
                            {comment.name}
                          </span>
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
                        <p className="text-gray-800 text-base font-normal">
                          {comment.body}
                        </p>
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
