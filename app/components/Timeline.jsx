"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAndUsers } from "../redux/postSlice";
import { fetchCommentsByPostId } from "../redux/commentsSlice";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

const Timeline = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);

  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    dispatch(fetchPostsAndUsers());
  }, [dispatch]);

  const toggleComments = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
    if (!showComments[postId]) {
      dispatch(fetchCommentsByPostId(postId));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4">
      {posts.map((post) => (
        <div key={post.id} className=" bg-white p-4 rounded shadow mb-4">
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Title: {post.title}</h3>
            <span className="text-lg font-normal">{post.body}</span>
            <span className="text-lg">Author: {post.userName}</span>
          </div>
          <button
            onClick={() => toggleComments(post.id)}
            className="text-blue-500 text-sm underline mt-2"
          >
            {showComments[post.id] ? "Hide Comments" : "Show Comments"}
          </button>
          {showComments[post.id] && (
            <div className=" mt-4">
              {comments[post.id] ? (
                comments[post.id].map((comment) => (
                  <div
                    key={comment.id}
                    className="grid gap-2 px-5 py-2 border-t"
                  >
                    <div className="flex justify-between items-center">
                      <small className="text-gray-500 text-xl">
                        {" "}
                        {comment.name}
                      </small>
                      <div className="flex gap-3 justify-center items-center">
                        <SlLike className="text-lg" />
                        <SlDislike className="text-lg" />
                      </div>
                    </div>
                    <p className="text-gray-800 text-lg font-normal">
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
    </div>
  );
};

export default Timeline;
